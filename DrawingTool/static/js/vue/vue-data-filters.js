Vue.config.devtools = true;

Vue.options.delimiters = ['{%', '%}'];

var hoverNavTimeout;
var placeHolderPropertyList = makePropList();

function makePropList(){
    // var propList = [];

    // for(var i = 0;i<13;i++){
    //     propList.push({index:i+1, left:Math.random()*100, color:"#cc0000"});
    // }
    // return propList;

    //0,8,16,24,32,48,56,64,72,80,88,96
    return [
        {index:0+1, left:12, color:"#d6dce5"},//
        {index:1+1, left:24, color:"#44b5d4"},//
        {index:2+1, left:36, color:"#c9e891"},
        {index:3+1, left:89, color:"#282828"},
        {index:4+1, left:55, color:"#a6a6a6"},
        {index:5+1, left:78, color:"#9fd5f3"},
        {index:6+1, left:30, color:"#cb5200"},//
        {index:7+1, left:85, color:"#80b226"},
        {index:8+1, left:47, color:"#ffb684"},
        {index:9+1, left:50, color:"#20768c"},
        {index:10+1, left:59, color:"#666666"}
    ];
}

function processPositions(positions){

    //var labels = linearSegments[0].getElementsByClassName("filter-label");
    for(var i = 0;i<positions.length;i++){
        addVal = 0;
        for (var j = 0;j<positions.length;j++){
            var locNum = positions[j].left;
            if(j != i && i>j && Math.abs(positions[i].left - locNum)<2){
                if(positions[i].left>locNum){
                    //top = "top:4px;";
                    //propList[index].left-=5;
                    addVal += 1.5;
                    bgColor = "background-color:rgba(0,225,0,.25);";
                }
                else{
                    //propList[index].left+=5;
                    //top = "top:-4px;";
                    addVal += -1.5;
                    bgColor = "background-color:rgba(225,0,0,.25);";
                }

            }
        }
        positions[i].left+=addVal;
    }

    return positions;



}

function applyToInfoBar(){
    var fList = [];
    var sList = [];
    var filter_labels = document.getElementById("data_filter_page").getElementsByClassName("filter-label");
    for(var i = 0;i<filter_labels.length;i++){
        var checkBox = filter_labels[i].getElementsByTagName("input")[0];
        if(!checkBox.checked){
            var spans = filter_labels[i].getElementsByTagName("span");
            //if(filter_labels[i].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("class").split("linear-segment-display").length>1){
            if(Number(filter_labels[i].getAttribute("section-index")) == 0){
                sList.push(spans[spans.length-1].innerHTML);
            }
            else{
                var filterNameList = spans[spans.length-1].innerHTML.split("|");
                if(filterNameList.length>1){
                    var filterNameString = "";
                    for(var j = 1;j<filterNameList.length;j++){
                        if(j>1){
                            filterNameString+="|";
                        }
                        filterNameString+=filterNameList[j];
                    }
                    fList.push("<span>"+filter_labels[i].getAttribute("section-name")+":</span> "+filterNameString);
                }
                else{
                    fList.push("<span>"+filter_labels[i].getAttribute("section-name")+":</span> "+filterNameList[0]);
                }
            }
        }
    }
    info_panel.filterList = fList;
    info_panel.segmentList = sList;
}

function getLabelByInputId(input_id){
    var lbl;
    var filterLabels = document.getElementsByClassName("filter-label");
    for(var i= 0; i<filterLabels.length;i++){
        if(filterLabels[i].getAttribute("input-id") == input_id){
            lbl = filterLabels[i];
        }
    }
    return lbl;
    
}

var filter_side_bar = new Vue({
    el:'#filter_navigation',
    data:{
        searchableFilters:[],
        renderedFilters:[],
        searchTerm:"",
        meatCuts:[],
        meatCut:""
    },
    methods:{
        getCheckBoxStyle:function(fID){
            var stl = "background-color:#dddddd;";
            var fLabels = document.getElementsByClassName("filter-label");
            for(var i = 0;i<fLabels.length;i++){
                var checkbox = fLabels[i].getElementsByTagName("input")[0];
                if(fID == checkbox.getAttribute("filter-id")){
                    if(checkbox.checked){
                        stl = "";
                    }

                }
            }
            return stl;
        },
        executeSearch:function(){
            filter_side_bar.renderedFilters = [];
            if(filter_side_bar.searchTerm != "" && filter_side_bar.searchTerm != undefined){
                for(var i = 0;i<filter_side_bar.searchableFilters.length;i++){
                    if(filter_side_bar.searchableFilters[i].label.toLowerCase().split(filter_side_bar.searchTerm.toLowerCase()).length>1 || filter_side_bar.searchableFilters[i].name.toLowerCase().split(filter_side_bar.searchTerm.toLowerCase()).length>1){
                        filter_side_bar.renderedFilters.push(filter_side_bar.searchableFilters[i]);
                    }
                }
            }
        },
        onCheckClicked:function(fID){
            var fLabels = document.getElementsByClassName("filter-label");
            for(var i = 0;i<fLabels.length;i++){
                var checkbox = fLabels[i].getElementsByTagName("input")[0];
                if(fID == checkbox.getAttribute("filter-id")){
                    checkbox.click();
                }

            }
            filter_side_bar.executeSearch();
        },
        onGoClicked:function(fID){
            var fLabels = document.getElementsByClassName("filter-label");
            for(var i = 0;i<fLabels.length;i++){
                var checkbox = fLabels[i].getElementsByTagName("input")[0];
                if(fID == checkbox.getAttribute("filter-id")){
                    document.getElementById("middle_main_container").scrollTop = fLabels[i].getBoundingClientRect().top-350;
                    filter_side_bar.renderedFilters = [];
                    filter_side_bar.searchTerm = "";
                }
            }
        },
        updateMeatCut:function(){
            data_page.meatCut = filter_side_bar.meatCut;
            // setTimeout(function(){
            //     var fLabels = document.getElementsByClassName("filter-label");
            //     for(var i = 0;i<fLabels.length;i++){
            //         var checkbox = fLabels[i].getElementsByTagName("input")[0];
            //         if(fLabels[i].style.display == "none" && Number(fLabels[i].getAttribute("section-index"))>6){
            //             if(checkbox.checked){
            //                 checkbox.click();
            //             }

            //         }
            //     }
            // },100);

        },
        toggleAllFilters:function(){data_page.toggleAllFilters();},
        run:function(){data_page.run();}
    }
});

var info_panel = new Vue({
    el:'#infobar',
    data:{
        segmentList:[],
        filterList:[]
    }
});


var data_page = new Vue({
    el: '#data_filter_page',
    data: {
        initialized: false,
        filters_headers: [],
        filters: [],
        filters_inputs: [],
        bases: {},
        toggle_states: [],
        loadingContent: false,
        gatherData: false,
        meatCut:"",
	    segment_line_label_text: ['Low Engagement', 'High Engagement'],
        segment_line_label_class: ['label label-primary pull-left', 'label label-primary pull-right'],
        meatCuts:[]
    },
    mounted: function(){
        this.get_filters();
        this.get_base();
    },
    updated: function(){
        if (!this.$data.initialized) {
            $.material.init();
            this.$data.initialized = true;
        }
    },
    watch: {
        loadingContent: function() {
            if (this.loadingContent){
                $('#opaque').show();
                hideResults();
            } else {
                $('#opaque').hide();
                revealResults();
                initialResults();
            }
        },
        gatherData: function(){
            if (this.gatherData){
                $('#opaque').show();
            } else {
                $('#opaque').hide();
            }
        }
    },

    methods: {
        selectAllInGroup:function(e){

            var self = this;
            
            _.map(this.filters_inputs, function(v, i){
                //console.log(v);
                var labelElement = getLabelByInputId(i);
                if (labelElement != undefined && labelElement.getAttribute("category") == e.currentTarget.getAttribute("group-name") && labelElement.getAttribute("section-name") == e.currentTarget.getAttribute("group-section") && self.filters_inputs[i] !== void 0) {
                    self.$set(self.filters_inputs, i, true)
                }
            });
            this.get_base();

        },
        unSelectAllInGroup:function(e){
            var self = this;
            
            _.map(this.filters_inputs, function(v, i){
                //console.log(v);
                var labelElement = getLabelByInputId(i);
                if (labelElement != undefined && labelElement.getAttribute("category") == e.currentTarget.getAttribute("group-name") && labelElement.getAttribute("section-name") == e.currentTarget.getAttribute("group-section") && self.filters_inputs[i] !== void 0) {
                    self.$set(self.filters_inputs, i, false)
                }
            });
            this.get_base();

        },
        accordionClick:function(e){
            if(e.currentTarget.parentNode.getAttribute("class").split("closed").length<2){
                e.currentTarget.parentNode.setAttribute("class","acordian-header closed");
            }
            else{
                e.currentTarget.parentNode.setAttribute("class","acordian-header");
            }
        },
        is_in_catagory:function(name,cat){
            //return label.split(cat).length>1;
            return name == cat || cat == "";
        },
        get_cagegories:function(rowsIndex){
            var cats = [""];
            if(rowsIndex>=10){
                cats = data_page.meatCuts;
            }
            return cats;
        },
        get_filters: function(){
            var self = this;
            this.gatherData = true;
            axios.post(BASE + CONTROLLER + '/get_filters')

                .then(function(response) {
                    //console.log(response);
                    self.$data.filters_headers = response.data.filters_headers;
                    self.$data.filters = response.data.filters;

                    var filter_names = [];
                    for(var i = 0;i<self.$data.filters.length;i++){
                        var listed = false;
                        for(var j = 0;j<filter_names.length;j++){
                            if(filter_names[j] == self.$data.filters[i].name){
                                listed = true;
                            }
                        }
                        if(!listed && (self.$data.filters[i].filter_group == "100" || self.$data.filters[i].filter_group == "200")){
                            filter_names.push(self.$data.filters[i].name);
                        }

                    }
                    self.$data.meatCuts = filter_names;
                    //console.log(filter_names);
                    filter_side_bar.meatCuts = filter_names;
                    filter_side_bar.searchableFilters = response.data.filters;

                    _.map(response.data.filters_headers, function(e, i){
                        self.$set(self.$data.toggle_states, e.filter_group, true);
                        try {
                            var layout_classes = e.layout_classes.split(',');
                            self.$set(self.$data.filters_headers[i], 'layout_classes', layout_classes);
                        } catch(error) {

                        }
                    });

                    _.map(response.data.filters, function(e){
                        self.$set(self.$data.filters_inputs, e.id, true);
                    });
                    self.gatherData = false;
                });
        },

        toggleAllFilters: function(){
            var self = this;
            var toggleVal = this.filters_inputs.indexOf(false) === -1 ? false : true;
            _.map(this.filters_inputs, function(v, i){
                if (self.filters_inputs[i] !== void 0) {
                    self.$set(self.filters_inputs, i, toggleVal)
                }
            });
            this.get_base();
        },

        run: function(){
            var self = this;
            self.loadingContent = true;
            axios.post(BASE + CONTROLLER + '/run', self.$data)
                .then(function(response) {
                    self.loadingContent = false;

                });
        },
        toggle_check: function(gid){
            var self = this;
            var filters = self.$data.filters;

            self.$set(self.$data.toggle_states, gid, !self.$data.toggle_states[gid]);

            var group_data = _.filter(self.$data.filters, {'filter_group': gid});
            _.map(group_data, function(e){
                self.$set(self.filters_inputs, e.id, self.$data.toggle_states[gid]);
            });
            self.get_base();
        },
        input_change: function(gid){
            var self = this;
            self.check_group(gid);
            self.get_base();
        },
        get_base: function(){
            var self = this;
            this.gatherData = true;
            axios.post(BASE + CONTROLLER + '/get_base', self.$data)
                .then(function(response) {
                    applyToInfoBar();
                    //console.log("rimmomg stuff!!!!!!!!");
                    self.overallBase = response.data['total'];
                    _.each(response.data, function(value, key){
                        self.$set(self.bases, key, value);
                    });
                    self.gatherData = false;
                    $('#ssize').html(response.data['total']);
                });
        },
        check_group: function(gid){
            var self = this;
            var filters = self.$data.filters;
            var checkboxes = self.$data.filters_inputs;

            var group_data = _.filter(self.$data.filters, {'filter_group': gid});
            var data = _.map(group_data, function(e) {return checkboxes[e.id];});
            var true_data = _.filter(data, function(e) {if (e) return e;}).length;

            self.$set(self.$data.toggle_states, gid, true_data > 0);
        },

        isFirst: function(index) {
            return index === 0 ? true : false;
        },

        getSegmentContainerClass: function(index){
            return index == 0 ? "col-sm-12 linear-segment-display" : index < 9 ? "col-sm-12 col-md-3" : "col-sm-12";
        },

        segmentLabelClass: function(index) {
            return this.segment_line_label_class[index];
        },

        sortRowz:function(_rowz,_index){
            //console.log(_rowz);
            return _rowz;
        },
        setFilterStyle:function(name){

            //var meatCutCheck = name.toLowerCase().split(data_page.meatCut.toLowerCase()).length>1 || label.toLowerCase().split(data_page.meatCut.toLowerCase()).length>1;
            var meatCutCheck = data_page.meatCut == name || data_page.meatCut == "";

            return meatCutCheck ? "" : "display:none;"

        },
        setFilterAccordionStyle:function(name){
            var stl = "display:none;";
            for(var i = 0;i<data_page.filters.length;i++){
                if(name == data_page.filters[i].name || data_page.meatCut == ""){
                    //var meatCutCheck = data_page.filters[i].name.toLowerCase().split(data_page.meatCut.toLowerCase()).length>1 || data_page.filters[i].label.toLowerCase().split(data_page.meatCut.toLowerCase()).length>1;
                    var meatCutCheck = data_page.filters[i].name == data_page.meatCut || data_page.meatCut == "";
                    if(meatCutCheck){
                        stl = "";
                    }
                }
            }



            return stl;

        },
        setFilterGroupStyle:function(header){
            var stl = "display:none;";
            for(var i = 0;i<data_page.filters.length;i++){
                if(header.filter_group == data_page.filters[i].filter_group){
                    var meatCutCheck = data_page.filters[i].name.toLowerCase().split(data_page.meatCut.toLowerCase()).length>1 || data_page.filters[i].label.toLowerCase().split(data_page.meatCut.toLowerCase()).length>1;

                    if(meatCutCheck){
                        stl = "";
                    }
                }
            }



            return stl;

        },

	 navMouseOver: function(index, labelIndex) {
            if (index > 0) {
                return false;
            } else {
                this.getSegmentPopup(labelIndex);
            }
        },

        navMouseLeave: function(index, labelIndex) {
            var isHovered = $('.info-flash-item:hover').length;
            if (isHovered === 0) {
                hideNavInfoFlash();
            }
        },

	   getSegmentPopup: function(labelIndex) {
            var self = this;
            var output = {};
            axios.post(BASE + CONTROLLER + '/get_segment_content', {'segment_id': labelIndex})
                .then(function(response) {
                    var header = response.data.header;
                    var body = response.data.body;
                    var color = response.data.color;
                    showNavInfoFlash(header, body, color);
                });
        },

        getLabelClass: function(index) {
            var layout_class = '';
            try {
                layout_class = this.filters_headers[index].layout_classes[1];
                return layout_class;
            } catch(error){
                return '';
            }
        },

        // getLinearSegmentProperies:function(index,fList,hIndex){

        //     var propList = [];
        //     var top="";
        //     //console.log(fList.length);
        //     //var addList = [];

        //     var addVal = 0;
        //     var bgColor = "background-color:transparent;";
        //     var percentageFactor = 1;
        //     if(hIndex == 0){

        //         for(var i = 0;i<fList.length;i++){
        //             propList.push(placeHolderPropertyList[i]);
        //         }


        //         var linearSegments = document.getElementsByClassName("linear-segment-display");
        //         if(linearSegments.length>0){
        //             var labels = linearSegments[0].getElementsByClassName("filter-label");
        //             percentageFactor = 1;

        //         }
        //     }







        //     return hIndex == 0 ? "left:"+(propList[index].left*percentageFactor).toString()+"%;"+top+bgColor : "";
        // },

        ready: function() {
        }
    }
});
