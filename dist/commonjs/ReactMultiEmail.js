"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var isEmail_1 = require("./isEmail");
var ReactMultiEmail = /** @class */ (function (_super) {
    __extends(ReactMultiEmail, _super);
    function ReactMultiEmail(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false,
            emails: [],
            inputValue: '',
        };
        _this.findEmailAddress = function (value, isEnter) {
            var validateEmail = _this.props.validateEmail;
            var validEmails = [];
            var inputValue = '';
            var re = /[ ,;]/g;
            var isEmail = validateEmail || isEmail_1.default;
            var addEmails = function (email) {
                var emails = _this.state.emails;
                for (var i = 0, l = emails.length; i < l; i++) {
                    if (emails[i] === email) {
                        return false;
                    }
                }
                validEmails.push(email);
                return true;
            };
            if (value !== '') {
                if (re.test(value)) {
                    var splitData = value.split(re).filter(function (n) {
                        return n !== '' && n !== undefined && n !== null;
                    });
                    var setArr = new Set(splitData);
                    var arr = __spread(setArr);
                    do {
                        if (isEmail('' + arr[0])) {
                            addEmails('' + arr.shift());
                        }
                        else {
                            if (arr.length === 1) {
                                /// 마지막 아이템이면 inputValue로 남겨두기
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
            _this.setState({
                emails: __spread(_this.state.emails, validEmails),
                inputValue: inputValue,
            });
            if (validEmails.length && _this.props.onChange) {
                _this.props.onChange(__spread(_this.state.emails, validEmails));
            }
            if (_this.props.onChangeInput && _this.state.inputValue !== inputValue) {
                _this.props.onChangeInput(inputValue);
            }
        };
        _this.onChangeInputValue = function (value) {
            if (_this.props.onChangeInput) {
                _this.props.onChangeInput(value);
            }
            _this.findEmailAddress(value);
        };
        _this.removeEmail = function (index) {
            _this.setState(function (prevState) {
                return {
                    emails: __spread(prevState.emails.slice(0, index), prevState.emails.slice(index + 1)),
                };
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.emails);
                }
            });
        };
        _this.handleOnKeydown = function (e) {
            switch (e.which) {
                case 13:
                case 9:
                    e.preventDefault();
                    break;
                case 8:
                    if (!e.currentTarget.value) {
                        _this.removeEmail(_this.state.emails.length - 1);
                    }
                    break;
                default:
            }
        };
        _this.handleOnKeyup = function (e) {
            switch (e.which) {
                case 13:
                case 9:
                    _this.findEmailAddress(e.currentTarget.value, true);
                    break;
                default:
            }
        };
        _this.handleOnChange = function (e) {
            return _this.onChangeInputValue(e.currentTarget.value);
        };
        _this.handleOnBlur = function (e) {
            _this.setState({ focused: false });
            _this.findEmailAddress(e.currentTarget.value, true);
            if (_this.props.onBlur) {
                _this.props.onBlur();
            }
        };
        _this.handleOnFocus = function () {
            _this.setState({
                focused: true,
            });
            if (_this.props.onFocus) {
                _this.props.onFocus();
            }
        };
        _this.emailInputRef = React.createRef();
        return _this;
    }
    ReactMultiEmail.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.propsEmails !== nextProps.emails) {
            return {
                propsEmails: nextProps.emails || [],
                emails: nextProps.emails || [],
                inputValue: '',
                focused: false,
            };
        }
        return null;
    };
    ReactMultiEmail.prototype.render = function () {
        var _this = this;
        var _a = this.state, focused = _a.focused, emails = _a.emails, inputValue = _a.inputValue;
        var _b = this.props, style = _b.style, getLabel = _b.getLabel, _c = _b.className, className = _c === void 0 ? '' : _c, noClass = _b.noClass, placeholder = _b.placeholder;
        // removeEmail
        return (React.createElement("div", { className: className + " " + (noClass ? '' : 'react-multi-email') + " " + (focused ? 'focused' : '') + " " + (inputValue === '' && emails.length === 0 ? 'empty' : ''), style: style, onClick: function () {
                if (_this.emailInputRef.current) {
                    _this.emailInputRef.current.focus();
                }
            } },
            placeholder ? React.createElement("span", { "data-placeholder": true }, placeholder) : null,
            emails.map(function (email, index) {
                return getLabel(email, index, _this.removeEmail);
            }),
            React.createElement("input", { ref: this.emailInputRef, type: "text", value: inputValue, onFocus: this.handleOnFocus, onBlur: this.handleOnBlur, onChange: this.handleOnChange, onKeyDown: this.handleOnKeydown, onKeyUp: this.handleOnKeyup })));
    };
    return ReactMultiEmail;
}(React.Component));
exports.default = ReactMultiEmail;
