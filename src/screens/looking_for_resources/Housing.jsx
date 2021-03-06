import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import { Icon } from 'antd';
import { connectModule } from 'redux-modules'
import { Spinner } from '@procore/core-react'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import LoadingSpinner from '../../components/LoadingSpinner'
import { Card } from '../../components/atoms'
import housingModule from '../../modules/housing'
import Layout from '../../components/Layout'
import HouseCard from '../../components/HouseCard'
import MobileHouseCard from '../../components/MobileHouseCard'
import {
  FullscreenOverlay,
  MobileContainer,
  Container,
  MobileHeaderContainer,
  HeaderContainer,
  StackInput
  } from '../../components/atoms'
import { SingleSelect } from '../../components/MultiSelect'
import OverlayLayout from '../../components/OverlayLayout'

const Button = styled.div`
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
  align-self: center;
  max-width: 720px;

  > div {
    margin-bottom: 30px;
  }
`

const Housing = ({
  filterPaneActive,
  hideFilters,
  showFilters,
  actions,
  loading,
  data,
  filters,
  history: { goBack }
}) => (
  <Layout header="Housing" onBack={goBack}>
      {filterPaneActive &&
        <OverlayLayout onBack={hideFilters}>
          <StackInput dark label="Housing Type">
            <SingleSelect
              value={filters.housing_type}
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
              value={filters.beds}
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
              value={filters.length_of_stay}
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
              value={filters.paid}
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
              value={filters.pets_accepted}
              options={[
                { label: "Allowed", value: true },
                { label: "Not Allowed", value: false }
              ]}
              onChange={selected =>
                actions.updateFilters({ key: 'pets_accepted', value: selected })
              }
            />
          </StackInput>

          <StackInput dark label="City">
            <SingleSelect
              value={filters.city}
              options={[
                { label: 'Arroyo Grande', value: 'Arroyo Grande' },
                { label: 'Atascadero', value: 'Atascadero' },
                { label: 'Camarillo', value: 'Camarillo' },
                { label: 'Lompoc', value: 'Lompoc' },
                { label: 'Los Osos', value: 'Los Osos' },
                { label: 'Mira monte', value: 'Mira monte' },
                { label: 'Morro Bay', value: 'Morro Bay' },
                { label: 'Newbury Park', value: 'Newbury Park' },
                { label: 'Oak View', value: 'Oak View' },
                { label: 'Ojai', value: 'Ojai' },
                { label: 'Orcutt', value: 'Orcutt' },
                { label: 'Oxnard', value: 'Oxnard' },
                { label: 'Paso Robles', value: 'Paso Robles' },
                { label: 'Pismo Beach', value: 'Pismo Beach' },
                { label: 'Port Hueneme', value: 'Port Hueneme' },
                { label: 'San Luis Obispo', value: 'San Luis Obispo' },
                { label: 'Santa Barbara', value: 'Santa Barbara' },
                { label: 'Santa Margarita', value: 'Santa Margarita' },
                { label: 'Shell Beach', value: 'Shell Beach' },
                { label: 'Templeton', value: 'Templeton' },
                { label: 'Thousand Oaks', value: 'Thousand Oaks' },
                { label: 'Ventura', value: 'Ventura' },
                { label: 'West Simi', value: 'West Simi' },
              ]}
              onChange={selected =>
                actions.updateFilters({ key: 'city', value: selected })
              }
            />
          </StackInput>
          <MobileFilterButton
            onClick={() => {
              hideFilters();
              actions.submitFilters()
            }}
          >
            <Icon type="search" style={{ marginRight: '10px' }}/>
            Filter
          </MobileFilterButton>
        </OverlayLayout>
      }
      <LoadingSpinner loading={loading}>
        <MediaQuery minDeviceWidth={320} maxDeviceWidth={480}>
          <MobileContainer>
            <MobileHeaderContainer style={{ marginBottom: '20px' }}>
              <h1> Housing </h1>

              <Icon
                onClick={showFilters}
                type="filter"
                style={{ display: 'flex', fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', marginRight: '10px', justifyContent: 'space-between', width: '75px', cursor: 'pointer' }}
              >
                Filter
              </Icon>
            </ MobileHeaderContainer>

            <CardList>
              {data.map((houseListing, i) => (
                <MobileHouseCard key={i} {...houseListing} />
              ))}
            </CardList>
          </MobileContainer>
        </ MediaQuery>

        <MediaQuery minDeviceWidth={481}>
          <Container style={{ padding: '15px 25px', width: '100%'}}>
            <HeaderContainer>
              <h1> Housing </h1>

              <Icon
                onClick={showFilters}
                type="filter"
                style={{
                  display: 'flex',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginRight: '10px',
                  justifyContent: 'space-between',
                  width: '75px',
                  cursor: 'pointer'
                }}
              >
                Filter
              </Icon>
            </HeaderContainer>
            <CardList>
              {data.map((houseListing, i) => (
                <HouseCard key={i} {...houseListing} />
              ))}
            </CardList>
          </Container>
        </MediaQuery>
      </LoadingSpinner>
  </Layout>
)

Housing.defaultProps = {
  loading: false,
  data: [],
}

export default compose(
  connectModule(housingModule),
  withStateHandlers({ filterPaneActive: false }, {
    showFilters: state => () => ({ filterPaneActive: true }),
    hideFilters: state => () => ({ filterPaneActive: false }),
  }),
  lifecycle({
    componentWillMount() {
      this.props.actions.list()
    }
  }),
)(Housing)
