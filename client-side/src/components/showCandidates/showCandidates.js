import React, { Component } from 'react';
import CandidatesTable from './candidatesTable';
import Filter from './filter';
import Statistics from './statistics';
import SearchBox from './searchBox';

class ShowCandidates extends Component {
    render() {
        const { searchQuery, allCandidates, filteredCandidates, onDecisionChange, onFilterAll, onFilterLecture, onFilterWorkshop, workshopFilter, onSearch } = this.props;
        return (
            <React.Fragment>
                <SearchBox value={searchQuery} onChange={onSearch} />
                <Filter
                    onFilterAll={onFilterAll}
                    onFilterLecture={onFilterLecture}
                    onFilterWorkshop={onFilterWorkshop} />
                <Statistics workshopFilter={workshopFilter} allCandidates={allCandidates} filteredCandidates={filteredCandidates} />
                <CandidatesTable
                    onDecisionChange={onDecisionChange}
                    candidates={filteredCandidates}
                />
            </React.Fragment>
        );
    }
}

export default ShowCandidates;