import Header, { IHeaderProps } from "./Header";
import { connect } from "react-redux";
import { IState } from "../../redux/reducers";
import { logOutUser } from "../../redux/actions/users";

const mapStateToProps = (state: IState): any => ({
  user: state.user
});

const mapDispatchToProps = {
  logOutUser
};

export default connect<Pick<IHeaderProps, "user">, Pick<IHeaderProps, "logOutUser">, any, IState>(
  mapStateToProps,
  mapDispatchToProps
)(Header);
