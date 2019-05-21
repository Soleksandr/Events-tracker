import * as actions from "../../redux/actions/users";
import { connect } from "react-redux";
import { IState } from "../../redux/reducers";
import { Register, IRegisterProps } from "./Register";

const mapStateToProps = (state: IState) => ({
  user: state.user
});

const mapDispatchToProps = {
  ...actions
};

export default connect<Pick<IRegisterProps, "user">, Pick<IRegisterProps, "createUser">, any, IState>(
  mapStateToProps,
  mapDispatchToProps
)(Register);
