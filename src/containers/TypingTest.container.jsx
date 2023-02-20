import React, { Component } from "react";
import { connect } from 'react-redux';
import TypingTest from "../components/TypingTest";
import "../components/typingTest.scss";
import { getParagraphSaga, setResultsSaga } from "../sagas/typingTest.saga";
import { isNullOrUndefined } from "../tools/TypingTest.helpers";

class TypingTestContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paragraph: undefined,
            paragraphId: undefined,
        };
    }

    componentDidMount() {
        this.props.getParagraphSaga();
    }

    componentDidUpdate(prevProps) {
        const { paragraphState } = this.props;

        if ((isNullOrUndefined(prevProps.paragraphState) && !isNullOrUndefined(paragraphState)) 
        || paragraphState !== prevProps.paragraphState){
            this.setState({
                paragraph: paragraphState.paragraph,
                paragraphId: paragraphState.paragraphId
            });
        }
    }

    handleTypingTestResult = (wpm, accuracy, timeRemaining) => {
        const { paragraphId } = this.state;

       this.resultObject = {
            paragraphId,
            wpm,
            accuracy,
            timeRemaining,
       }

       this.props.setResultsSaga(this.resultObject);
    };

    render() {
        const { paragraph } = this.state;
        if(!isNullOrUndefined(paragraph)){
            return (
                <div className="body">
                    <h1>Typing Test</h1>
                    <TypingTest
                        text={paragraph}
                        onTypingTestResult={this.handleTypingTestResult}
                    >
                    </TypingTest>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        paragraphState: state.typingTestState.paragraph,
    };
  }
  
  export default connect(mapStateToProps, {getParagraphSaga, setResultsSaga})(TypingTestContainer);