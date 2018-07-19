import React, {Component} from 'react';
import ReactStars from 'react-stars';
import iOS from '../../assets/images/iOS/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';
import Android from '../../assets/images/android/google-play-badge.png';
import './gamedetails.scss';
import {connect} from 'react-redux';
import {viewDetails} from '../../actions/';
import Screenshots from '../carousel/screenshot-carousel';
import formatPostData from '../../helpers/';
import axios from 'axios';
import Loader from '../loader';

class GameDetailsIndexPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            infoExpanded: {
                gameDescripSection: false
            },
            screenshots: []
        };
    };
    toggleDescriptionExpand(event){
        event.stopPropagation();
        this.state.infoExpanded.gameDescripSection = !this.state.infoExpanded.gameDescripSection;
        this.setState({
            ...this.state
        });
    }
    
    // componentDidMount(){
    //     if(!this.props.viewDetails){
    //         const newItem = {searchrequest: this.props.match.params.game_details};
    //         const postItem = formatPostData(newItem);
    //         const resp = axios.post('/api/gameapp.php', postItem, {
    //             params: {
    //                 action: 'details'
    //             }
    //         })
    //     } else {
    //         this.props.viewDetails(this.props.match.params.game_details);
    //     }
    // }

    componentWillMount(){
        this.props.viewDetails(this.props.match.params.game_details);
    }
    //---------------------
    componentDidUpdate(prevProps, prevState){
        if(Object.keys(prevProps.details).length !== Object.keys(this.props.details).length
            || prevProps.details.id !== this.props.details.id || !this.state.screenshots.length
        ){
            this.splitScreenshots(this.props.details.screenshot_urls);
        }
    }
    splitScreenshots(str){
        var screenshotsSplit = str.split(',');
        this.setState({
            screenshots: screenshotsSplit
            });
    }
    //----------------------
    render(){
        console.log(this.props);
        if (!Object.keys(this.props.details).length){
            return (
                <Loader />
            )
        }
        const gameDetails = this.props.details;
        console.log('details', gameDetails);
        const gameDescripExpand = {
            height: this.state.infoExpanded.gameDescripSection ? "auto" : "144px",
            background: this.state.infoExpanded.gameDescripSection ? "transparent" : "linear-gradient(to bottom, rgba(175,238,238,0), rgba(175,238,238,0.2))"
        };
        const expandButton = this.state.infoExpanded.gameDescripSection ? "less.." : "more..";
        // --------------------------------------
        let getiOS = false;
        let getAndroid = false;
        let iOSLink = '';
        let androidLink = '';
        if (gameDetails.platform === "both") {
            getiOS = true;
            iOSLink = gameDetails.secondary_store_url;
            getAndroid = true;
            androidLink = gameDetails.store_url;
        } else if (gameDetails.platform === "apple") {
            getiOS = true;
            iOSLink = gameDetails.store_url;
        } else if (gameDetails.platform === "android") {
            getAndroid = true;
            androidLink = gameDetails.store_url;
        }
        const iOSButtonDisplay = {
            display: getiOS ? "block" : "none"
        }
        const androidButtonDisplay = {
            display: getAndroid ? "block" : "none"
        }
        // --------------------------------------
        return(
            <div className="singleGamePage">
                <div className="gameTitle">
                    <h2>{gameDetails.app_name}</h2>
                </div>
                <div className="upperDisplay">
                    <div className="gameImg">
                        <img src={gameDetails.icon_url}/>
                    </div>
                </div>
                <div className="gameDetailsBottom">
                    <div className="detailsBottomInnerBox">
                        <div className="priceAndRating">
                            <h4>
                                {gameDetails.price_value}
                            </h4>
                            <div className="ratingStars">
                                <h5 className="ratingNum">
                                    {gameDetails.all_rating} 
                                </h5>
                                <ReactStars count={5} size={24} color2={'#ffd700'} value={parseFloat(gameDetails.all_rating)} edit={false}/>
                            </div>
                        </div>
                        <div className="getItHere">
                            <button type="iOSButton" style={iOSButtonDisplay}>
                                <a href={iOSLink} target='_blank'><img src={iOS} className="iOSButtonImg"/></a>
                            </button>
                            <button type="androidButton" style={androidButtonDisplay}>
                            <a href={androidLink} target='_blank'><img src={Android} className="androidButtonImg"/></a>
                            </button>
                        </div>
                        <div>
                            <div className="gameDetailsTiny">
                                <div>
                                    <div>
                                        {gameDetails.publisher_name}
                                    </div>
                                    <div>
                                        {gameDetails.release_date.slice(0, 4)}
                                    </div>
                                </div>
                                <div>
                                    Rated: {gameDetails.content_rating}
                                </div>
                                <div className="genre">
                                    <div>
                                        Genre: 
                                    </div>
                                    <div>
                                        {gameDetails.genres.replace(/,/g ,", ")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="screenshots">
                    <Screenshots images={this.state.screenshots}/>
                </div>

                <div className="gameDetailsBottom">
                    <div className="detailsBottomInnerBox">
                        <h4 className="descripHeader">
                            Description
                        </h4>
                        <div className="gameDescripOuterBox">
                            <div dangerouslySetInnerHTML={{__html: gameDetails.description}} className="gameDescrip" style={gameDescripExpand} />
                        </div>
                        <div className="descripExpandDiv">
                            <button className="descripExpandButton" type="button" onClick={this.toggleDescriptionExpand.bind(this)}>
                                {expandButton}
                            </button>
                        </div>
                    </div> 
                </div>       
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        details: state.game.details
    }
}
export default connect(mapStateToProps, {viewDetails})(GameDetailsIndexPage);