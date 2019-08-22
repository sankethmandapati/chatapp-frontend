import React, {useState, useEffect} from 'react';
import "../../styles/Chat.scss";

const Friends = ({
    hideFriendsListModal, 
    toggleModal, 
    friendsList, 
    selectThisFriend
}) => {
    const [friendSearch, setFriendSearch] = useState('');
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const filteredList = friendsList.filter((friend) => {
            return friend.name.toLowerCase().includes(this.state.friendSearch);
        });
        setFriends(filteredList);
    }, [friendSearch]);
    const searchFriend = (e) => {
        e.preventDefault();
        setFriendSearch(e.target.value.toLowerCase());
    }
    return (
        <div className="friends__mobile" aria-hidden={hideFriendsListModal.toString()} >
            <i onClick={toggleModal} className="fa fa-times"></i>
            <div className="friends__mobile--friendslist">
                <div className="searchbar">
                    <input type="text" onChange={searchFriend} placeholder="Search or start new chat" />
                </div>
                {
                    friends.map((friend, n) => {
                        return (
                            <a href="/" key={'friend_' + n} className={friend.isOnline ? 'online' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    selectThisFriend(friend)}
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
};

export default Friends;