import React, { Component } from 'react';

export default class Logout extends Component
{
    constructor(props)
    {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e)
    {
        e.preventDefault();
        this.setState(
            {
                googleId: '0',
                token: '0'
            }
        )
        window.location = '/';
    }

    render()
    {
        return (
            <div>
                <h3> Logout </h3>
                <form onClick={this.onClick}>
                    <div>
                        <input type="submit" value="Logout" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}
