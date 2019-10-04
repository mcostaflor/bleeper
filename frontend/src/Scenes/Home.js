import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftMenu from '../Components/LeftMenu';
import { Switch, Route } from 'react-router-dom';
import Bleeps from './Bleeps';

class Home extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <LeftMenu />
                <Switch>
                    <Route exact path="/" component={Bleeps} />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    usuario: state.usuario
});

export default connect(mapStateToProps)(Home);
