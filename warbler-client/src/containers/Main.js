import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import MessageForm from './MessageForm';
import AuthWrapper from '../hocs/AuthWrapper';


const Main = props => {

    const { authUser, errors, removeError, currentUser } = props;

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Homepage
                        currentUser={currentUser}
                        {...props}
                    />
                }
            />
            <Route
                path='/signin'
                element={
                    <AuthForm
                        errors={errors}
                        removeError={removeError}
                        onAuth={authUser}
                        buttonText='Log in'
                        heading='Welcome Back'
                        {...props}
                    />
                }
            />
            <Route
                path='/signup'
                element={
                    <AuthForm
                        errors={errors}
                        removeError={removeError}
                        onAuth={authUser}
                        signup
                        buttonText='Sign me up'
                        heading='Join Warbler today'
                        {...props}
                    />
                }
            />
            <Route
                path='/users/:id/messages/new'
                element={
                    <AuthWrapper>
                        <MessageForm />
                    </AuthWrapper>
                }
            />
        </Routes>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { authUser, removeError })(Main);