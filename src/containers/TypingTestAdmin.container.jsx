import React, { Component } from "react";
import { connect } from 'react-redux';
import TypingTestAdmin from "../components/TypingTestAdmin ";
import "../components/typingTest.scss";
import { isNullOrUndefined } from "../tools/TypingTest.helpers";
import { 
    getParagraphSaga, 
    setParagraphSaga, 
    getAllResultsSaga,
    deleteResultSaga
} from "../sagas/typingTest.saga";

class TypingTestAdminContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paragraph: undefined,
            paragraphId: undefined,
            results: [],
        };
    }

    componentDidMount() {
        this.props.getParagraphSaga();
        this.props.getAllResultsSaga();
    }

    componentDidUpdate(prevProps) {
        const { paragraphState, allResults } = this.props;

        if ((isNullOrUndefined(prevProps.paragraphState) && !isNullOrUndefined(paragraphState)) 
        || paragraphState !== prevProps.paragraphState){
            this.setState({
                paragraph: paragraphState.paragraph,
                paragraphId: paragraphState.paragraphId
            });
        }

        if ((isNullOrUndefined(prevProps.allResults) && !isNullOrUndefined(allResults)) 
        || allResults !== prevProps.allResults){
            this.setState({
                results: allResults
            });
        }
    }

    //sets the state paragraph to new one as it is being typed
    onParagraphChange = (newParagraph) => {
        this.setState({ paragraph: newParagraph });
    };

    //creates new paragraph in db
    handleTypingTestParagraph = (newParagraph) => {
        this.props.setParagraphSaga(newParagraph);
    };

    //deletes the selected result set
    handleDeleteResult = (id) => {
        this.props.deleteResultSaga(id);
    };

    render() {
        const { paragraph, results } = this.state;

        if(!isNullOrUndefined(paragraph) && results.length > 0){
            return (
                <>
                    <div className="body">
                        <h1>Typing Test Configuration</h1>
                        <TypingTestAdmin
                            text={paragraph}
                            results={results}
                            onChange={this.onParagraphChange}
                            onSubmit={this.handleTypingTestParagraph}
                            onDelete={this.handleDeleteResult}
                        >
                        </TypingTestAdmin>
                    </div>
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        paragraphState: state.typingTestState.paragraph,
        allResults: state.typingTestState.allResults,
    };
  }
  
  export default connect(mapStateToProps, {
    getParagraphSaga, 
    setParagraphSaga, 
    getAllResultsSaga,
    deleteResultSaga
})(TypingTestAdminContainer);