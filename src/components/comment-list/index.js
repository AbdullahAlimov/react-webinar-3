import React, { memo } from 'react';
import Comment from '../comment';
import AddAnswerForm from '../add-answer-form';
import PropTypes from 'prop-types';
import "./style.css"


function CommentList({ list, exists,lang,parent, onChangeParent, onResetParent, onSignIn, onAdd }) {

    return (
        <div className='CommentList'>
            <p className='CommentList-length'>{`Комментарии (${list.length})`}</p>
            <div className='CommentList-content'>
                {list.map((item) => {
                    return (
                        <div key={item.id}
                            style={{ marginLeft: item.depth * 30 }}>
                            <Comment
                                id={item.id}
                                lang={item.lang}
                                name={item.author.profile.name}
                                content={item.content}
                                onChangeParent={onChangeParent}
                                date={item.date}
                            />
                            {parent._id === item.id &&
                                <AddAnswerForm
                                    exists={exists}
                                    onSignIn={onSignIn}
                                    onCancel={onResetParent}
                                    onAdd={onAdd}
                                ></AddAnswerForm>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

CommentList.propTypes = {
    list: PropTypes.array,
    exists:PropTypes.bool,
    parent:PropTypes.object,
    onChangeParent:PropTypes.func,
    onResetParent:PropTypes.func,
    onSignIn:PropTypes.func,
    onAdd:PropTypes.func
}

CommentList.defaultProps={
    onChangeParent:()=>{},
    onResetParent:()=>{},
    onSignIn:()=>{},
    onAdd:()=>{}
}

export default memo(CommentList);