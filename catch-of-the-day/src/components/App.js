import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    //first reinstate our localstorage
    const storeId = this.props.match.params.storeId;
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    const storeId = this.props.match.params.storeId;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3 . Set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // 2. Update State
    fishes[key] = updatedFish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  deleteFish = (key) => {
    // 1. Take a copy of existing state
    const fishes = { ...this.state.fishes };
    //2. Delete the Fish
    fishes[key] = null;
    // 3. Update state
    this.setState({
      fishes: fishes,
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addtoOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };
    //2. Either add to the order, or update the order
    order[key] = order[key] + 1 || 1;
    //3. Call setState to update our state object
    this.setState({
      order: order,
    });
  };

  deleteOrder = (key) => {
    // 1. Take a copy of existing state
    const order = { ...this.state.order };
    //2. Remove from the order
    delete order[key];
    // 3. Update state
    this.setState({
      order: order,
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                addtoOrder={this.addtoOrder}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteOrder={this.deleteOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
