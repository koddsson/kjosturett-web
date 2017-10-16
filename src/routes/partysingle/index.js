import React from 'react';
import PartySingle from './PartySingle';
import Layout from '../../components/Layout';
import parties from '../../lib/data/parties.json';
import { pleasantUrl } from '../../utils';

export default ({ params }) => {
  const party = parties.filter(party => party.url === params.party)[0];

  if (!party) throw Error('Not found');

  let categories = [];
  try {
    categories = require(`../../lib/data/${party.url}.json`);
  } catch (e) {
    console.error(e);
  }

  return {
    chunks: ['partysingle'],
    title: `${party.name} - Kjóstu Rétt`,
    path: `/flokkur/${party.url}`,
    component: (
      <Layout
        page="flokkar"
        title={party.name}
        altTitle={
          <a href={party.website} target="_blank">
            {pleasantUrl(party.website)}
          </a>
        }
      >
        <PartySingle party={party} categories={categories} />
      </Layout>
    ),
  };
};
