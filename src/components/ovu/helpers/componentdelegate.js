import ClaimView from './../subcomponents/ClaimView/ClaimView';

export default delegateComponent = (componentName) => {
    switch (componentName) {
        case 'ClaimView':
            return (<ClaimView />);
            break;
        default:
            return null;
    }
}