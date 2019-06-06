import * as actions from "../../redux/actions/events";
import { connect } from "react-redux";
import { Home, IHomeProps } from "./Home";
import { Event } from "../../services/Event";
import { IState } from "../../redux/reducers";
import { ITableRows } from "./components/Table/Table";

const mapEventsToTableData = (events: IState["events"]): ITableRows[] => {
  // console.log(events);
  // @ts-ignore
  return events.reduce((rows, rawEvent) => {
    const event = new Event(rawEvent);
    // const nextEvent = event.getEvent();
    console.log(" = rawEvent = ", rawEvent);
    return [ ...rows, event.getEvent() ];

  }, []);
};
// console.log("--- now ---- ", eventService.getCurrentDateInfo());

const mapStateToProps = (state: IState) => ({
  user: state.user,
  events: mapEventsToTableData(state.events)
});

const mapDispatchToProps = {
  ...actions
};

export default connect<Pick<IHomeProps, "user">, any, any, IState>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
