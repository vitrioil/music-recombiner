import { Component } from "react";


class BaseView extends Component {
  constructor({ type }) {
    super();
    this.type = type;
  }
}

export default BaseView;