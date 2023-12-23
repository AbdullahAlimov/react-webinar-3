import React, { memo, useCallback, useMemo, useState } from 'react';
import CommentList from '../../components/comment-list';
import AddCommentForm from '../../components/add-comment-form';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useLocation, useNavigate } from 'react-router-dom';
import commentActions from "../../store-redux/comments/actions"
import Spinner from '../../components/spinner';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';

const Comments = ({articleId}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {t,lang}=useTranslate();

    const select = useReduxSelector(state => ({
        comments: state.comments.items,
        waiting: state.comments.waiting,
    }))
    const exists = useSelector(state => state.session.exists)

    const [selectParent, setSelectParent] = useState({
        _id: articleId,
        _type: "article",
    })

    const callbacks = {
        // Переход к авторизации
        onSignIn: useCallback(() => {
            navigate('/login', { state: { back: location.pathname } });
        }, [location.pathname]),

        changeSelectParent: useCallback((id) => {
            setSelectParent({
                _id:id,
                _type:"comment"
            })
        },[selectParent]),
        resetParent: useCallback(() => {
            setSelectParent(({
                _id: articleId,
                _type: "article",
            }))
        }, [articleId]),
        addComment: useCallback((text) => {
            dispatch(commentActions.addComment({text,parent:selectParent,id:articleId}))
            setSelectParent(({
                _id: articleId,
                _type: "article",
            }))
        }, [selectParent])
    }

    const lists = {
        comment: useMemo(() => ((treeToList(listToTree(select.comments), (item, level) => (
            {
                id: item._id,
                author: item.author,
                date: item.dateCreate,
                depth: level-1,
                content: item.text
            }
        )))).slice(1),[select.comments]),
    };
return (
    <Spinner active={select.waiting}>
        <CommentList
            list={lists.comment}
            exists={exists}
            lang={lang}
            t={t}
            parent={selectParent}
            onChangeParent={callbacks.changeSelectParent}
            onAdd={callbacks.addComment}
            onResetParent={callbacks.resetParent}
            onSignIn={callbacks.onSignIn}>
        </CommentList>
        {selectParent._id===articleId && <AddCommentForm exists={exists} onSignIn={callbacks.onSignIn} onAdd={callbacks.addComment} t={t}></AddCommentForm>}
    </Spinner>
);
};

Comments.propTypes={
    articleId:PropTypes.string
}

export default memo(Comments);