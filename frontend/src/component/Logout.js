
import {actionCreator as UserAction} from 'redux/modules/user'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = (dispatch, ownProp) =>{
    return {
        logout : () =>{
            dispatch(UserAction.logout())
        }
    }
}

const Logout = props =>{
    const {logout} = props
    logout()
    return null
}
Logout.propTypes={
    logout : PropTypes.func.isRequired
}
export default connect(null, mapDispatchToProps)(Logout)