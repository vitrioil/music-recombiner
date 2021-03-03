import { Component } from "react";


class BaseEffect extends Component {
  constructor({ type }) {
    super();
    this.type = type;
  }
}

export default BaseEffect;