import React from 'react';

export const User = (user) => {
    return (
        <div className="chat_list">
            <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                <div className="chat_ib">
                    <h5>{user.name}</h5>
                    <small>{user.email}</small>
                </div>
            </div>
        </div>
    );
};