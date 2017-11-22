Vue.config.devtools = true;

Vue.options.delimiters = ['{%', '%}'];

var hoverNavTimeout;
var default_page = new Vue({
    el: '#default_page',
    data: {
        jumbo_title: 'smithfield demand landscape',
        jumbo_subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        jumbo_image: STATIC_IMAGES_PATH + '/smithfield-logo.png',
        landing_background_header: 'background information',
        classPanel: 'panel flex-panel card',
        landing_navs: [
            {
                text: 'project documents',
                a: PROJECT_DOCS_PATH,
                external: false,
                blurb: 'Access and download project documents',
                verbose: '<p>Access and download project documents including:</p><ul><li>Survey Questionnaire</li><li>Raw Data Files</li><li>Data Tabulations</li><li>Opportunities</li><li>Etc.</li></ul>',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'project docs',
                icon: 'fa fa-file-text fa-stack-1x fa-inverse',
                color: '#299345',
                classPanelTheme: 'panel-success',
                classTextTheme: 'text-success',
                classButtonTheme: 'btn btn-info btn-block',
            },
            {
                text: 'explore opportunities',
                a: EXPLORE_ACROSS_PATH,
                external: false,
                blurb: 'Here they can select a filter or show total sample and explore opportunities and sizes',
                verbose: 'Here they can select a filter or show total sample and explore opportunities and sizes',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'smithfield shopper profiles segmentation',
                icon: 'fa fa fa-users fa-stack-1x fa-inverse',
                color: '#299345',
                classPanelTheme: 'panel-success',
                classTextTheme: 'text-success',
                classButtonTheme: 'btn btn-info btn-block',
            },
            {
                text: 'explore a specific opportunity',
                a: EXPLORE_SPECIFIC_PATH,
                external: false,
                blurb: 'Here you can select a specific OPPORTUNITY to learn more',
                verbose: 'Here you can select a specific OPPORTUNITY to learn more',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'smithfield demand landscape',
                icon: 'fa fa fa-user fa-stack-1x fa-inverse',
                color: '#299345',
                classPanelTheme: 'panel-success',
                classTextTheme: 'text-success',
                classButtonTheme: 'btn btn-info btn-block',
            },
        ],
        landing_background_tabs: [
            {
                tabTitle: 'tab 1',
                tabContent: 'tab 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
                tabTitle: 'tab 2',
                tabContent: 'tab 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
                tabTitle: 'tab 3',
                tabContent: 'tab 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },

        ],
    },
    computed: {
        nav_grid_class: function() {
            var maxCols = 12;
            var numCols = this.landing_navs.length;
            // var medSize = maxCols / numCols >= 3 ? 4 : maxCols / numCols;
            var medSize = '4';
            return [
                'col-sm-' + maxCols,
                'col-md-' + medSize,
            ];
        },
    },
    methods: {
        navMouseOver: function(index) {
            clearTimeout(hoverNavTimeout);
            // var header = '<img src="' + this.landing_navs[index].logo_path + '" class="img-responsive">';
            var header = this.landing_navs[index].text;
            var body = this.landing_navs[index].verbose;
            var color = this.landing_navs[index].color;
            showNavInfoFlash(header, body, color);
        },
        navMouseLeave: function(index) {
            hoverNavTimeout = setTimeout(function(){
                var isHovered = $('.info-flash-item:hover').length;
                if (isHovered === 0) {
                    hideNavInfoFlash();
                }
            }, 1000);
        },
    },
});
