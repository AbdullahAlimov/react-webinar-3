import React, { memo, useState, useRef, useEffect } from 'react';
import Comment from '../comment';
import AddAnswerForm from '../add-answer-form';
import PropTypes from 'prop-types';
import "./style.css"


function CommentList({ list, exists, lang, t, onChangeParent, onResetParent, onSignIn, onAdd }) {

    const [answerFormInfo, setAnswerFormInfo] = useState({ parent: {}, place: {} })

    const answerFormRef = useRef(null);

    useEffect(() => {
        answerFormRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [answerFormInfo])

    const renders = {
        addAnswerForm(startIndex) {
            const renderList = list.slice(startIndex)
            const parentItem = renderList[0];

            for (let index = 0; index < renderList.length; index++) {
                if (renderList[index + 1].depth <= parentItem.depth) {
                    console.log("результат", renderList[index])
                    setAnswerFormInfo({ parent: parentItem, place: renderList[index] })
                    return;
                }
            }
        }
    }

    const callbacks = {
        onChangeParent: (id, index) => {
            onChangeParent(id)
            renders.addAnswerForm(index)
        },
        onCancel: () => {
            onResetParent();
            setAnswerFormInfo({ parent: {}, place: {} });
        }
    }

    return (
        <div className='CommentList'>
            <p className='CommentList-length'>{t("commentList.comments") + ` (${list.length})`}</p>
            <div className='CommentList-content'>
                {list.map((item, index) => {
                    return (
                        <div key={item.id}>
                            <div style={{ marginLeft: item.depth * 30 }}>
                                <Comment
                                    id={item.id}
                                    index={index}
                                    lang={lang}
                                    t={t}
                                    name={item.author.profile.name}
                                    content={item.content}
                                    onChangeParent={callbacks.onChangeParent}
                                    date={item.date}
                                />
                            </div>
                            {answerFormInfo.place?.id === item.id &&
                                <div
                                    ref={answerFormRef}
                                    style={{ marginLeft: (answerFormInfo.parent.depth + 1) * 30 }}
                                >
                                    <AddAnswerForm
                                        exists={exists}
                                        onSignIn={onSignIn}
                                        onCancel={callbacks.onCancel}
                                        onAdd={onAdd}
                                        t={t}
                                    ></AddAnswerForm>
                                </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

CommentList.propTypes = {
    list: PropTypes.array,
    exists: PropTypes.bool,
    onChangeParent: PropTypes.func,
    onResetParent: PropTypes.func,
    onSignIn: PropTypes.func,
    onAdd: PropTypes.func
}

CommentList.defaultProps = {
    onChangeParent: () => { },
    onResetParent: () => { },
    onSignIn: () => { },
    onAdd: () => { }
}

export default memo(CommentList);