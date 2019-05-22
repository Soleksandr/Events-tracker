import { connect } from "react-redux";
import { Home, IHomeProps } from "./Home";
import { IState } from "../../redux/reducers";

const mapStateToProps = (state: IState) => ({
  user: state.user
});

export default connect<Pick<IHomeProps, "user">, null, any, IState>(
  mapStateToProps,
  null
)(Home);
