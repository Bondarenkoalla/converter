import "./Converter.css";
import React, {useCallback, useEffect, useState} from "react";
import {fetchConvert} from "./api";
import Select from 'react-select';
import arrows from './images/arrows-converts.svg';

const Converter = () => {

    const options = [
        {value: 'BTC', label: 'BTC'},
        {value: 'GBP', label: 'GBP'},
        {value: 'USD', label: 'USD'},
        {value: 'EUR', label: 'EUR'},
        {value: 'CAD', label: 'CAD'},
        {value: 'PLN', label: 'PLN'},
        {value: 'UAH', label: 'UAH'}
    ];

    const [fromValue, setFromValue] = useState(1);
    const [toValue, setToValue] = useState();

    const [fromCurrency, setFromCurrency] = useState(options[0]);
    const [toCurrency, setToCurrency] = useState(options[2]);

    const handleChangeFromValue = useCallback((event) => {
        setFromValue(event.target.value );
    }, []);

    const handleChangeFromCurrency = useCallback((event) => {
        setFromCurrency(event);
    }, []);

    const handleChangeToCurrency = useCallback((event) => {
        setToCurrency(event);
    }, []);

    const round = function(number, precision) {
        precision = precision || 0;
        const multiplier = Math.pow(10, precision);
        return Math.round(number * multiplier) / multiplier;
    }

    useEffect(() => {
        if (!fromCurrency || !toCurrency) {
            return;
        }

        fetchConvert(fromCurrency.value, toCurrency.value, fromValue).then(response => {
            if (isNaN(response.result)) {
                setToValue(0);
                return
            }
            setToValue(round(response.result,5));
        });
    }, [fromCurrency, toCurrency, fromValue]);

    const handleClick = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <form className="converter d-flex flex-column align-items-center justify-content-center">
                        <label htmlFor="fromValue">you give
                        </label>
                        <Select
                            onChange={handleChangeFromCurrency}
                            value={fromCurrency}
                            options={options}
                            className="select"
                        />
                        <input
                            className="input"
                            type="text"
                            autoComplete="off"
                            autoFocus
                            value={fromValue}
                            id="fromValue"
                            onChange={handleChangeFromValue}
                        />
                        <a onClick={handleClick} className="button">
                            <img src={arrows} alt=""/>
                        </a>
                        <label htmlFor="toValue">you get
                        </label>
                        <Select
                            onChange={handleChangeToCurrency}
                            value={toCurrency}
                            options={options}
                            className="select"
                        />
                        <input
                            className="input"
                            type="text"
                            autoComplete="off"
                            readOnly
                            defaultValue={toValue}
                            id="toValue"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Converter;

