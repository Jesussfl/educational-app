import { gql } from "graphql-request";

export const querySectionById = gql`
  query ($id: ID!) {
    crefinexSection(id: $id) {
      data {
        id
        attributes {
          content
        }
      }
    }
  }
`;
export const querySections = gql`
  query ($start: Int, $limit: Int) {
    sections(start: $start, limit: $limit) {
      data {
        id
        attributes {
          description
          order
          createdAt
          updatedAt
          publishedAt
          lessons {
            data {
              id
              attributes {
                description
                order
                type
              }
            }
          }
          world {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`;

export const querySectionsByWorldId = gql`
  query ($id: ID!, $start: Int, $limit: Int) {
    sectionsByWorld(id: $id, start: $start, limit: $limit) {
      sections {
        id
        attributes {
          description
          order
          createdAt
          updatedAt
          publishedAt
          lessons {
            data {
              id
              attributes {
                description
                order
                type
              }
            }
          }
        }
      }
      world {
        name
        description
        image {
          data {
            attributes {
              formats
            }
          }
        }
      }
    }
  }
`;
