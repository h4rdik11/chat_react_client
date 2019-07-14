import React from 'react';

export const Message = (data) => {
    return (
        <div className={data.message.sender === data.userDetails.name ? "outgoing_msg":"incoming_msg"}>
            {
                data.message.sender !== data.userDetails.name && 
                <div className="incoming_msg_img"> 
                    <img alt="user" src="https://ptetutorials.com/images/user-profile.png" /> 
                </div>
            }
            <div className={data.message.sender === data.userDetails.name ? "sent_msg":"received_msg"}>
                {data.message.sender !== data.userDetails.name ? 
                    <div className="received_withd_msg">
                        <span>{data.message.sender}</span>
                        {
                            data.getDateTime(data.message.message, data.parsedDate)
                        }
                    </div>
                    : data.getDateTime(data.message.message, data.parsedDate)
                }
            </div>
        </div>
    );
}