Vue.config.devtools = true;

Vue.options.delimiters = ['{%', '%}'];

var hoverNavTimeout;
var $navbar = $('.main-navbar');
var default_page = new Vue({
    el: '#default_page',
    data: {
        jumbo_title: 'smithfield placeholder title',
        jumbo_subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        landing_background_header: 'background information',
        classPanel: 'panel flex-panel card',
        landing_navs: [
            {
                text: 'smithfield idea space concept screening',
                a: IDEA_SPACE_PATH,
                external: '_blank',
                blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                verbose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                logo_path: STATIC_IMAGES_PATH + '/idea_space_logo.png',
                logo_alt: 'smithfield idea space concept screening',
                icon: 'fa fa-lightbulb-o fa-stack-1x fa-inverse',
                color: '#E08E26',
                classPanelTheme: 'panel-primary',
                classTextTheme: 'text-primary',
                classButtonTheme: 'btn btn-primary btn-block',
            },
            {
                text: 'smithfield shopper profiles segmentation',
                a: SEGMENTATION_PATH,
                external: false,
                blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                verbose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'smithfield shopper profiles segmentation',
                icon: 'fa fa-map-o fa-stack-1x fa-inverse',
                color: '#086D90',
                classPanelTheme: 'panel-info',
                classTextTheme: 'text-info',
                classButtonTheme: 'btn btn-info btn-block',
            },
            {
                text: 'smithfield demand landscape',
                a: DEMAND_LANDSCAPE_PATH,
                external: false,
                blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                verbose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'smithfield demand landscape',
                icon: 'fa fa-cogs fa-stack-1x fa-inverse',
                color: '#299345',
                classPanelTheme: 'panel-success',
                classTextTheme: 'text-success',
                classButtonTheme: 'btn btn-success btn-block',
            },
            {
                text: 'project documents',
                a: PROJECT_DOCS_PATH,
                external: false,
                blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                verbose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'project docs',
                icon: 'fa fa-file-text fa-stack-1x fa-inverse',
                color: '#B43C96',
                classPanelTheme: 'panel-warning',
                classTextTheme: 'text-warning',
                classButtonTheme: 'btn btn-warning btn-block',
            },
            {
                text: 'smithfield tbd',
                a: '#',
                external: false,
                blurb: 'the next upcoming study',
                verbose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                logo_path: STATIC_IMAGES_PATH + '/smithfield-logo.png',
                logo_alt: 'smithfield demand landscape',
                icon: 'fa fa-question fa-stack-1x fa-inverse',
                color: '#918e8e',
                classPanelTheme: 'panel-default landing-nav-tbd',
                classTextTheme: 'text-default',
                classButtonTheme: 'btn btn-default btn-block disabled',
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
            var header = '<img src="' + this.landing_navs[index].logo_path + '" class="img-responsive">';
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
