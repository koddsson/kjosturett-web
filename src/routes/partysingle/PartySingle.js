import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Collapse } from 'react-collapse';
import Scroll from 'react-scroll';

let scroll = Scroll.animateScroll;

import s from './PartySingle.scss';

class PartySingle extends PureComponent {
  state = {
    open: []
  };
  render() {
    const { open } = this.state;
    const { party, categories } = this.props;

    return (
      <div className={s.root}>
        <div className={s.party}>
          <h2 className={s.name}>{party.name}</h2>
          <h3 className={s.letter}>
            <b>Listabókstafur:</b>
            <span>{`x${party.letter}`}</span>
          </h3>
          <a className={s.website} href={party.website} target="_blank">
            {party.website}
          </a>
          <div className={s.leaderImage}>
            <img
              src={`https://s3.eu-west-2.amazonaws.com/assets.kjosturett.is/formenn/${party.url}.png`}
            />
          </div>
          <h5 className={s.leaderName}>{party.leader}</h5>
          <h6 className={s.leaderTitle}>{party.leaderTitle}</h6>
        </div>
        <div className={s.categories}>
          {categories.map(category => (
            <div className={s.category} key={category.category}>
              <div className={s.info}>
                <div>
                  <img
                    src={`https://s3.eu-west-2.amazonaws.com/assets.kjosturett.is/${category.category}_black.svg`}
                    className={s.image}
                  />
                </div>
                <h5
                  className={s.name}
                  onClick={e => {
                    let found = false;
                    let newOpen = [...this.state.open].filter(categoryUrl => {
                      console.log(categoryUrl, category);
                      if (categoryUrl === category.category) {
                        found = true;
                        return false;
                      }
                      return true;
                    });

                    if (!found) {
                      newOpen.push(category.category);
                    }

                    this.setState(() => ({
                      open: newOpen
                    }));

                    var curtop = 0;
                    if (e.target.offsetParent) {
                      do {
                        curtop += e.target.offsetTop;
                      } while ((e.target = e.target.offsetParent));
                    }
                    scroll.scrollTo(curtop - 20);
                  }}
                >
                  {category.name}
                </h5>
              </div>
              <Collapse
                isOpened={
                  category.statement === '' ||
                  open.indexOf(category.category) > -1
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      category.statement !== ''
                        ? category.statement
                        : 'Ekkert svar barst við þessum málaflokki'
                  }}
                  className={cx(
                    s.text,
                    category.statement === '' ? s.textNoReply : null
                  )}
                />
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PartySingle);
