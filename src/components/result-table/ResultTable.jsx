import React from 'react';
import { Table, Alert, Tabs, Tab } from 'react-bootstrap';
import './ResultTable.css';

class ResultTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loaded: false,
            error: "",
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    loadData(lat, lon) {
        let ip = process.env.REACT_APP_BACKEND_IP || "localhost";
        fetch("http://" + ip + ":7777/api/v1/trip/find?lat=" + lat + "&lon=" + lon)
		    .then(res => {
				if (res.ok) return res.json()
				
				throw res;
		    })
            .then((result) => {
				console.log(result)
				this.setState({
                    loaded: true,
                    error: "",
                    data: result,
                });

                this.props.onFinishLoad();
            })
            .catch((error) => {
				console.log(error)
				if (typeof error.text === 'function') {
						error.text().then(msg => {
								this.setState({
										loaded: true,
										error: msg,
										data: {},
								})
						})
				} else {
						this.setState({
							loaded: true,
							error: "Failed to fetch data from service"
						});
				}
                this.props.onFinishLoad();
            });
    }


    render() {
        if (this.props.loading || !this.state.loaded) {
            return (<div/>)
        }

        if (this.state.error !== "") {
            return (
                <Alert variant='danger'>
                    {this.state.error}
                </Alert>
            );
		}

		if (this.state.data.beerCount === 0) {
		    return (
				<Alert variant='warning'>
						Could not find a suitable route
				</Alert>
			);
		}

        return (
            <div>
                <h2 className="text-center">Your trip route:</h2>
                <Tabs defaultActiveKey="summary" id="route-tabs">
                    <Tab eventKey="summary" title="Summary">
                        <ul>
                            <li><b>Kilometres travelled:</b> {Math.round(this.state.data.fuelUsed * 10) / 10} km</li>
                            <li><b>Breweries visited:</b> {this.state.data.points.length - 2}</li>
                            <li><b>Beers tasted:</b> {this.state.data.beerCount}</li>
                            <li><a href={"https://www.google.com/maps/dir/" + this.state.data.points.map((point) => point.location.latitude.toString() + "+" + point.location.longitude.toString() + "/").reduce((acc, c) => (acc + c))}>Link to Google Maps</a></li>
                        </ul>
                    </Tab>
                    <Tab eventKey="breweries" title="Breweries">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Coordinates</th>
                                <th>Beer types</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.points.map(
                                ((point, index) => (
                                    <tr key={index}>
                                        <td>
                                            {index}
                                        </td>
                                        <td>
                                            {point.name}
                                        </td>
                                        <td>
                                            {point.location.latitude}, {point.location.longitude}
                                        </td>
                                        <td>
                                            {point.beerTypeCount}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="beerTypes" title="Beers tasted">
                        <ul>
                            {this.state.data.beerTypes.map(
                                ((beerType, index) => (
                                    <li key={index}>{beerType}</li>
                                ))
                            )}
                        </ul>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}

export default ResultTable;
