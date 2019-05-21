import * as actions from "../../redux/actions/users";
import { connect } from "react-redux";
import { Login, ILoginProps } from "./Login";
import { IState } from "../../redux/reducers";

const mapStateToProps = (state: IState) => ({
  user: state.user
});

const mapDispatchToProps = {
  ...actions
};

export default connect<Pick<ILoginProps, "user">, Pick<ILoginProps, "loginUser">, any, IState>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
