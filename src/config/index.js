const CONF = {
    actionKitPageShortName: 'stop_the_fcc_nov_swap_2018',
    actionKitPageId: 2532
};
const URLS = {
    actionKit: 'https://act.demandprogress.org/act/',
    count: 'https://act.demandprogress.org/progress/' + CONF.actionKitPageShortName + '?callback=onFetchSignatureCounts',
    facebook: 'https://www.facebook.com/sharer.php?u=',
    twitter:  'https://twitter.com/intent/tweet?text=',
    feedack: 'https://dp-feedback-tool.herokuapp.com/api/v1/feedback?'
};

export { CONF, URLS };