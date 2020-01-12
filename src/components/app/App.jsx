import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Topbar from '../topbar/Topbar'
import CoordinateInput from '../coordinate-input/CoordinateInput';
import ResultTable from '../result-table/ResultTable'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.onSubmitCoordinates = this.onSubmitCoordinates.bind(this);
        this.onFinishLoad = this.onFinishLoad.bind(this);
    }

    onSubmitCoordinates (lat, lon) {
        this.setState({
            loading: true,
        });

        this.resultTable.loadData(lat, lon);
    };

    onFinishLoad () {
        this.setState({
            loading: false
        })
    };

    render() {
        return (
            <div className="App">
                <Topbar/>
                <Jumbotron>
                    <h1 className={"text-center"}>Find your local excursion through the beer factories!</h1>
                    <CoordinateInput onSubmit={this.onSubmitCoordinates} loading={this.state.loading}/>
                    <ResultTable onFinishLoad={this.onFinishLoad} loading={this.state.loading} onRef={ref => (this.resultTable = ref)}/>
                </Jumbotron>
            </div>
        );
    }
}

export default App;
