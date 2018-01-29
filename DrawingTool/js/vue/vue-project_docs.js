Vue.config.devtools = true;

Vue.options.delimiters = ['{%', '%}'];


axios.get("../project_docs/files")
.then(function (output) {        
    var all_files = output["data"];    

    var project_docs_page = new Vue({
        el: '#project_docs_page',
        data: {
            jumbo_title: 'Project Documents',
            jumbo_subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            landing_background_header: 'background information',
            classPanel: 'panel card one-edge-shadow',
            searchPlaceHolder: "Search for a file",
            files: all_files,
            searchQuery: ''        
        },
        computed: {
            nav_grid_class: function() {
                var maxCols = 12;
                var numCols = this.landing_navs.length;
                var medSize = maxCols / numCols;
                return [
                    'col-sm-' + maxCols,
                    'col-md-' + medSize,
                ];
            },
        },
        methods:{
            executeSearch: function(){
                var search_files = [];
                var searchQuery = project_docs_page.searchQuery.toLowerCase();

                for (i = 0; i < all_files.length; i++) {
                    ///////////Search fields 
                    //title, filename
                    var temp_title = all_files[i].title.toLowerCase();
                    var temp_filename = all_files[i].report_filename.toLowerCase();
                    
                    if (temp_title.indexOf(searchQuery) !== -1 || temp_filename.indexOf(searchQuery) !== -1) {
                        search_files.push(all_files[i]);
                    }
                }
                project_docs_page.files = search_files;
            },   
            delete_click: function(i) {
                $('#deleteId').val(i.id.toString());
                $('#deleteConfirm').appendTo("body");
            },      
            data_row_id: function(i) {
                return "data_row_" + i.id.toString();
            },
            deletePopup_id: function(i) {
                return "deletePopup_" + i.id.toString();
            },
            download_href: function(i) {
                return "/smithfieldmicrosite/project_docs/download/" + i.id.toString();
            }
        }
    });

})
.catch(function (error) {
    console.log(error);
});
