import { connect } from "react-redux";
import { Test, ITestProps } from "./Test-component";
import * as actions from "../../redux/actions/test";
import { IState } from "../../redux/reducers";

const mapStateToProps = (state: IState) => ({
  text: state.test.text
});
const mapDispatchToProps = {
  ...actions
};

export default connect<Pick<ITestProps, "text">, Pick<ITestProps, "testSaga">, null, IState>(
  mapStateToProps,
  mapDispatchToProps
)(Test);
