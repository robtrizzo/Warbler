import MessageList from '../containers/MessageList';
import UserAside from "./UserAside";

const MessageTimeline = props => {
    console.log('timeline')
    return (
        <div className="row">
            <UserAside
                profileImageUrl={props.profileImageUrl}
                username={props.username}
            />
            <MessageList />
        </div>
    );
}

export default MessageTimeline;