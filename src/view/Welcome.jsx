import {Fragment, createRef, h, render, Component} from 'preact';

import '#/view/Welcome.scss';
import { isIterable } from 'core-js';

export default class Welcome extends Component {
    welcomePageRef = createRef();
    state = {
        page: 0,
        touching: false,
        startX: 0,
        displacement: 0
    };

    pages = [
        {i: 0, title: 'chinese-helper', body: `Welcome to the free chinese helper software created by Nathan Seymour.`, color: '#3891A6'},
        {i: 1, title: 'The Philosophy', body: `The most efficient and successful language learners create their own resources, we give you the tools to do just that.`, color: '#8F3985'},
        {i: 2, title: 'Mobility', body: `Cloud based and mobile optimized, you can take your study session with you anywhere.`, color: '#2F3061'},
        {i: 3, title: 'Get Started', body: `Well, what are you waiting for?`, color: '#FF595E'},
    ];

    pageNext = () => {
        if(this.state.page + 1 < this.pages.length) {
            this.setState({page: this.state.page + 1})
        }
    };

    pageBack = () => {
        if(this.state.page - 1 > -1) {
            this.setState({page: this.state.page - 1})
        }
    };

    touchStart = e => {
        e.preventDefault();
        this.setState({touching: true, startX: e.touches[0].pageX, displacement: 0});
    };

    touchEnd = e => {
        this.setState({touching: false});
        if(this.state.displacement < -100) {
            this.pageNext();
        } else if(this.state.displacement > 100) {
            this.pageBack();
        }
    };

    touchCancel = e => {
        this.setState({touching: false});
    };

    touchMove = e => {
        if(Math.abs(e.touches[0].pageX - this.state.startX) > 15) {
            this.setState({displacement: e.touches[0].pageX - this.state.startX});
        }
    };

    render(_, {touching, displacement}) {
        return (
            <>
                <div onTouchStart={this.touchStart}
                    onTouchEnd={this.touchEnd}
                    onTouchCancel={this.touchCancel}
                    onTouchMove={this.touchMove}
                    ref={this.welcomePageRef} 
                    className="welcome"
                    data-status={touching ? 'touching' : 'not-touching'}
                    style={{ transform: touching ? `translateX(calc(-${String(this.state.page)} * 100vw + ${displacement}px * 1.1))` : `translateX(calc(-${String(this.state.page)} * 100vw))` }}>
                    {this.pages.map(page => 
                        <div style={{background: page.color}} className="welcome-page">
                            <div className="page-title">{page.title}</div>
                            <div className="page-body">{page.body}</div>
                        </div>
                    )}
                </div>

                <div className="welcome-side-navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </div>

                <div className="welcome-navigation">
                    {this.pages.map(page => 
                        <svg data-status={page.i === this.state.page ? 'active' : 'inactive'} viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"/>
                        </svg>
                    )}
                </div>
            </>
        );
    }
};