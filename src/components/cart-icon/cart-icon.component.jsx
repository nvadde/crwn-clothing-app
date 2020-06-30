import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemCount } from "../../redux/cart/cart.selector";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={ toggleCartHidden }>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{ itemCount }</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps =  createStructuredSelector ({
    itemCount: selectCartItemCount
});

/*
const mapStateToProps = ({ cart: { cartItems }}) => ({
    itemCount: cartItems.reduce((accQty, cartItem) => accQty + cartItem.quantity, 0)
});
*/

export default connect( mapStateToProps, mapDispatchToProps)(CartIcon);