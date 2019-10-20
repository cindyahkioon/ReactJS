import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    ingredientsPrice = {
        salad: 1,
        bacon: 2,
        cheese: 1,
        meat: 3
    };

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        loading: false,
        purchasing: false,
        purchased: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-burger-291c3.firebaseio.com/ingredients.json')
        .then((response) => {
            this.setState({ ingredients: response.data });
        })
        .catch((error) => {
            this.setState({ error: true });
        })
    }

    addIngredientHandler = (type) => {
        let newCount = this.state.ingredients[type] + 1;
        let newIngredients = {
            ...this.state.ingredients,
            [type]: newCount,
        };
        this.setState({ 
            ingredients: newIngredients,
            totalPrice: this.state.totalPrice + (this.ingredientsPrice[type])
        });
    }

    removeIngredientHandler = (type) => {
        let newCount = this.state.ingredients[type] - 1 ;
        newCount = (newCount < 0) ? 0 : newCount;
        let newIngredients = {
            ...this.state.ingredients,
            [type]: newCount,    
        };
        this.setState({ 
            ingredients: newIngredients, 
            totalPrice: this.state.totalPrice - (this.ingredientsPrice[type]) });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
        console.log(this.state);
    }

    purchaseCancelledHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        const orderData = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Cindy',
                address: 'Venus Planet'
            }
        };
        this.setState({ loading: true });
        axios.post('https://react-burger-291c3.firebaseio.com/orders.json', orderData)
        .then((response) => {
            this.setState({ loading: false, purchasing: false, purchased: true });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelledHandler}>
                    <Aux>
                        {this.state.loading && <Spinner />}
                        {this.state.purchased && <p>Successful</p>}
                        {!this.state.loading && !this.state.purchaed && <OrderSummary 
                            ingredients={this.state.ingredients} 
                            onPurchaseCancelled={this.purchaseCancelledHandler}
                            onPurchaseContinued={this.purchaseContinueHandler}
                        />}
                    </Aux>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onIngredientAdded={this.addIngredientHandler}
                    onIngredientRemoved={this.removeIngredientHandler}
                    onOrder={this.purchaseHandler}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.totalPrice > 6}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);