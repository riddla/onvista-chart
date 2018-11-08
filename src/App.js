import React, {Component} from 'react';
import StocksTableRow from './components/StocksTableRow'
// import StocksTable from './components/StocksTable'
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {fetchStocks} from './api'
import chartConfig from './config/chartConfig'
import stocksConfig from './config/stocks'
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...chartConfig,
            stocks: [],
            loadingStocks: true
        }
    }

    componentDidMount() {
        let stocksToQuery = stocksConfig.toString();
        fetchStocks(stocksToQuery, 'quote', '1y').then((stocks) => {
            this.setState({
                loadingStocks: false,
                stocks: Object.values(stocks)
            });
        })
    }

    render() {
        return (
            <div className="App">
                <AppBar position="static">
                    <Typography variant="h2" color="inherit">
                        Musterdepot
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        Inline-Chart Demo (Reactjs)
                    </Typography>
                </AppBar>
                <div className="content">
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell>price (open)</TableCell>
                                    <TableCell>Chart</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.loadingStocks ?
                                    <TableRow>
                                        <TableCell colSpan={4} style={{textAlign: 'center'}}>
                                            <CircularProgress className="loader" size={30}/>
                                        </TableCell>
                                    </TableRow>
                                    : this.state.stocks.map(stock => {
                                        return (<StocksTableRow
                                            key={stock.quote.symbol}
                                            stock={stock}/>);
                                    })}
                                {}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default App;
