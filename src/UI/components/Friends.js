import React from 'react';
import "../../styles/Chat.scss";

const Friends = ({
    showFriendsListModal, 
    toggleModal, 
    friendsList, 
    selectThsiFriend, 
    searchFriend
}) => (
    <div className="friends__mobile" aria-hidden={showFriendsListModal.toString()} >
        <i onClick={toggleModal} className="fa fa-times"></i>
        <div className="friends__mobile--friendslist">
            <div className="searchbar">
                <input type="text" onChange={(e) => searchFriend(e.target.value)} placeholder="Search or start new chat" />
            </div>
            {
                friendsList.map((friend, n) => {
                    return (
                        <a href="/" key={'friend_' + n} className={friend.isOnline ? 'online' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                selectThsiFriend(friend)}
                            }>
                            <p>
                                {
                                    friend.name
                                }
                            </p>
                        </a>
                    );
                })
            }
        </div>
    </div>
);

export default Friends;