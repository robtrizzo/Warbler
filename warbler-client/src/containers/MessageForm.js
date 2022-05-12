import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { postNewMessage } from "../store/actions/messages";

function MessageForm(props) {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleNewMessage = event => {
        event.preventDefault();
        props.postNewMessage(message);
        setMessage('');
        navigate('/');
    };

    return (
        <form onSubmit={handleNewMessage}>
            {
                props.errors.message && (
                    <div className="alert alert-danger">
                        {props.errors.message}
                    </div>
                )
            }
            <input
                type="text"
                className="form-control"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-success pull-right">
                Add my message!
            </button>
        </form>
    );
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);