import React from 'react'
import styled from 'styled-components'
import { connectModule } from 'redux-modules'
import { Spinner } from '@procore/core-react'
import { Icon } from 'antd'
import MediaQuery from 'react-responsive'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import {
  Container,
  MobileContainer,
  Card,
  MobileHeaderContainer,
  HeaderContainer,
  StackInput,
} from '../../components/atoms';
import { SingleSelect } from '../../components/MultiSelect'
import lfVolunteersModule from '../../modules/lfVolunteers'
import Layout from '../../components/Layout'
import VolunteerListingCard from '../../components/VolunteerListingCard'
import MobileVolunteerListingCard from '../../components/MobileVolunteerListingCard'
import LoadingSpinner from '../../components/LoadingSpinner';
import OverlayLayout from '../../components/OverlayLayout';

const MobileFilterButton = styled.div`
  border: 1px solid #47ABFC;
  border-radius: 2px;
  padding: 5px 10px;
  color: #FFF;
  background-color: #47ABFC;
  cursor: pointer;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 30px;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bosttom: 30px;
  }
`

const Volunteers = ({ actions, filters, loading, data, filterPaneActive, hideFilters, showFilters, history: { goBack }}) => (
  <Layout header="Volunteers" onBack={goBack}>
    {filterPaneActive &&
      <OverlayLayout onBack={hideFilters}>
        <StackInput dark label="Housing Type">
          <SingleSelect
            value={filters}
            options={[
              { label: "House", value: "house" },
              { label: "Room", value: "room" }
            ]}
            onChange={selected =>
              actions.updateFilters({ key: 'housing_type', value: selected })
            }
          />
        </StackInput>

        <StackInput dark label="Beds Available">
          <SingleSelect
            value={filters}
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5+", value: "5" }
            ]}
            onChange={selected =>
              actions.updateFilters({ key: 'beds', value: selected })
            }
          />
        </StackInput>

        <StackInput dark label="Duration">
          <SingleSelect
            value={filters}
            options={[
              { label: "Short Term", value: "short" },
              { label: "Long Term", value: "long" },
              { label: "Permanent", value: "permanent" }
            ]}
            onChange={selected =>
              actions.updateFilters({ key: 'length_of_stay', value: selected })
            }
          />
        </StackInput>

        <StackInput dark label="Paid">
          <SingleSelect
            value={filters}
            options={[
              { label: "Paid", value: true },
              { label: "Free", value: false }
            ]}
            onChange={selected =>
              actions.updateFilters({ key: 'paid', value: selected })
            }
          />
        </StackInput>

        <StackInput dark label="Pets Allowed">
          <SingleSelect
            value={filters}
            options={[
              { label: "Allowed", value: true },
              { label: "Not Allowed", value: false }
            ]}
            onChange={selected =>
              actions.updateFilters({ key: 'pets_accepted', value: selected })
            }
          />
        </StackInput>

        <MobileFilterButton
          onClick={hideFilters}
        >
          <Icon type="search" style={{ marginRight: '10px' }}/>
          Filter
        </MobileFilterButton>
      </OverlayLayout>
    }
      <LoadingSpinner loading={loading}>
        <CardList>
          <MediaQuery minDeviceWidth={320} maxDeviceWidth={480}>
            <MobileContainer style={{ margin: '15px 25px'}}>
              <MobileHeaderContainer style={{ marginBottom: '20px' }}>
                <h1> Volunteer </h1>
                <Icon
                  onClick={showFilters}
                  type="filter"
                  style={{ display: 'flex', fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', marginRight: '10px', justifyContent: 'space-between', width: '75px', cursor: 'pointer' }}
                  >
                  Filter
                </Icon>
              </ MobileHeaderContainer>
              {data.map((volunteerListing, i) => (
                <MobileVolunteerListingCard key={i} {...volunteerListing} />
              ))}
            </MobileContainer>
          </MediaQuery>

          <MediaQuery minDeviceWidth={481}>
            <Container>
              <HeaderContainer>
                <h1> Volunteer </h1>
                <Icon
                  onClick={showFilters}
                  type="filter"
                  style={{ display: 'flex', textTransform: 'uppercase', fontWeight: 'bold', marginRight: '10px', justifyContent: 'space-between', width: '75px', cursor: 'pointer' }}
                >
                  Filter
                </Icon>
              </ HeaderContainer>
              {data.map((volunteerListing, i) => (
                <VolunteerListingCard key={i} {...volunteerListing} />
              ))}
            </Container>
          </MediaQuery>
        </CardList>
      </LoadingSpinner>
  </Layout>
)

Volunteers.defaultProps = {
  loading: true,
  data: [],
}

export default compose(
  connectModule(lfVolunteersModule),
  withStateHandlers({ filterPaneActive: false }, {
    showFilters: state => () => ({ filterPaneActive: true }),
    hideFilters: state => () => ({ filterPaneActive: false }),
  }),
  lifecycle({
    componentWillMount() {
      this.props.actions.list()
    }
  }),
)(Volunteers)
