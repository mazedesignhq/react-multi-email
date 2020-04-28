import * as React from 'react';
import isEmailFn from './isEmail';
class ReactMultiEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            emails: [],
            inputValue: '',
        };
        this.findEmailAddress = (value, isEnter) => {
            const { splitRegexp, validateEmail } = this.props;
            let validEmails = [];
            let inputValue = '';
            const re = splitRegexp || /[ ,;]/g;
            const isEmail = validateEmail || isEmailFn;
            const addEmails = (email) => {
                const trimmedEmail = email.trim();
                const emails = this.state.emails;
                for (let i = 0, l = emails.length; i < l; i++) {
                    if (emails[i] === trimmedEmail) {
                        return false;
                    }
                }
                validEmails.push(trimmedEmail);
                return true;
            };
            if (!['', ','].includes(value)) {
                if (re.test(value)) {
                    let splitData = value.split(re).filter(n => {
                        return !['', ',', undefined, null].includes(n);
                    });
                    if (!splitData.length) {
                        return;
                    }
                    const setArr = new Set(splitData);
                    let arr = [...setArr];
                    do {
                        if (isEmail('' + arr[0])) {
                            addEmails('' + arr.shift());
                        }
                        else {
                            if (arr.length === 1) {
                                /// If it is the last item, leave it as inputValue
                                inputValue = '' + arr.shift();
                            }
                            else {
                                arr.shift();
                            }
                        }
                    } while (arr.length);
                }
                else {
                    if (isEnter) {
                        if (isEmail(value)) {
                            addEmails(value);
                        }
                        else {
                            inputValue = value;
                        }
                    }
                    else {
                        inputValue = value;
                    }
                }
            }
            this.setState({
                emails: [...this.state.emails, ...validEmails],
                inputValue: inputValue,
            });
            if (validEmails.length && this.props.onChange) {
                this.props.onChange([...this.state.emails, ...validEmails]);
            }
            if (this.props.onChangeInput && this.state.inputValue !== inputValue) {
                this.props.onChangeInput(inputValue);
            }
        };
        this.onChangeInputValue = (value) => {
            if (this.props.onChangeInput) {
                this.props.onChangeInput(value);
            }
            this.findEmailAddress(value);
        };
        this.removeEmail = (index) => {
            this.setState(prevState => {
                return {
                    emails: [
                        ...prevState.emails.slice(0, index),
                        ...prevState.emails.slice(index + 1),
                    ],
                };
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.emails);
                }
            });
        };
        this.handleOnKeydown = (e) => {
            switch (e.which) {
                case 13: // enter
                case 9: // tab
                    if (e.currentTarget.value && e.currentTarget.value.length) {
                        e.preventDefault();
                    }
                    break;
                case 8: // delete
                    if (!e.currentTarget.value) {
                        this.removeEmail(this.state.emails.length - 1);
                    }
                    break;
                default:
            }
        };
        this.handleOnKeyup = (e) => {
            switch (e.which) {
                case 13:
                case 9:
                    this.findEmailAddress(e.currentTarget.value, true);
                    break;
                default:
            }
        };
        this.handleOnChange = (e) => this.onChangeInputValue(e.currentTarget.value);
        this.handleOnBlur = (e) => {
            this.setState({ focused: false });
            this.findEmailAddress(e.currentTarget.value, true);
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        };
        this.handleOnFocus = () => {
            this.setState({
                focused: true,
            });
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        };
        this.emailInputRef = React.createRef();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.propsEmails !== nextProps.emails) {
            return {
                propsEmails: nextProps.emails || [],
                emails: nextProps.emails || [],
                inputValue: '',
                focused: false,
            };
        }
        return null;
    }
    render() {
        const { focused, emails, inputValue } = this.state;
        const { style, getLabel, className = '', noClass, placeholder } = this.props;
        // removeEmail
        return (React.createElement("div", { className: `${className} ${noClass ? '' : 'react-multi-email'} ${focused ? 'focused' : ''} ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`, style: style, onClick: () => {
                if (this.emailInputRef.current) {
                    this.emailInputRef.current.focus();
                }
            } },
            placeholder ? React.createElement("span", { "data-placeholder": true }, placeholder) : null,
            emails.map((email, index) => getLabel(email, index, this.removeEmail)),
            React.createElement("input", { ref: this.emailInputRef, type: "text", value: inputValue, onFocus: this.handleOnFocus, onBlur: this.handleOnBlur, onChange: this.handleOnChange, onKeyDown: this.handleOnKeydown, onKeyUp: this.handleOnKeyup })));
    }
}
export default ReactMultiEmail;
