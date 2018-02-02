// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <h2>Test</h2>
        <video id="camera" autoplay> </video>
        {/* <div id="camdemo" style="width: 320px; height: 240px; text-align: center; margin: 0 auto;"></div>
        <div style="text-align:center;">
            <input type="button" id="start" value="Start / Shut down camera"/>
        </div> */}
      </div>
    );
  }
}
