'use strict';

const { gql } = require('@apollo/client');

const DRUG_DOSE_QUERY = gql`
  query DrugDose($name: String!) {
    drug(name: $name) {
      id
      name
      roas {
        name
        dose {
          unit
          threshold
          light
          common
          strong
          heavy
        }
        duration {
          unit
          onset
          comeup
          peak
          comedown
          afterglow
        }
      }
    }
  }
`;

module.exports = async function doseSubcommand({ message, tsapi }, drugName) {
  const drug = await tsapi.query({
    query: DRUG_DOSE_QUERY,
    variables: { drug: drugName },
  });

  if (!drug) return message.reply(`No results for ${drugName}.`);
};
