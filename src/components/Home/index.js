import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName,
  tags: state.home.tags
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
  onUnload: () =>
    dispatch({  type: 'HOME_PAGE_UNLOADED' }),
  onClickTag: (tag, payload) =>
    dispatch({ type: 'APPLY_TAG_FILTER', tag, payload })

});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlePromise = this.props.token ? agent.Articles.feed() : agent.Articles.all();
    const promises = Promise.all([agent.Tags.all(), articlePromise]);
    this.props.onLoad(tab, promises);
  }

  render() {
    const { appName } = this.props;
    return (
      <div className='home-page'>
        <Banner appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
