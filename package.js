
// 商品打包流程及数据；不包含修改


/************  数据  **********/

/**** 商品包数据 ****
 * create 打包时，用户创建的数据
 * 保存在 localStorage
 */
var packageData = {
		'package_name': '包的名称',
		'package_describe': '包的描述',
		'position': '包的定位',
		'quantity': '限量',
		'img_main': [img], // 图片（主图）
		'img_info': [img, img, ...], // 图片（详情图）
		'goods_info': [goods_group, goods_group, ...] // 商品组
	};

// 图片，一张图片
var img = {
		'server_id': '服务器id',
		'img_url': '图片路劲'
	};

// 商品组，包中的一个商品组；一组包含多个商品
var goods_group = {
		'default': goods_info, // 商品（默认商品）
		'replace': [goods_info, goods_info, ...] // 商品（替代商品）
	};

// 具体商品，包中的一个具体商品的信息
var goods_info = {
		'goods_info_id': '具体商品的id(meiren_goods_info_tbl)',
		'package_price': '该商品打包卖的单价',
		'num': '该商品在该包的数量'
	};




/**** 商品数据 ****
 * get 从服务器获取，共用户选择
 * 保存在 内存
 */
var goodsData = [goods, goods, ...]; // 商品

// 商品，一个商品
var goods = {
		'add_time': '商品添加时间',
		'class_main_id': '商品分类，大类',
		'class_minor_id': '商品分类，小类',
		'comment_count': '评论数量',
		'deletion': '是否已删除',
		'goods_describe': '商品描述',
		'goods_id': '商品id(meiren_goods_tbl)',
		'goods_info': [goods_info, goods_info, ...], // 商品的所有型号（具体商品）
		'goods_name': '商品名称',
		'img_main': [img], // 图片
		'inventory': '该商品库存数量',
		'price': '默认型号的价格',
		'sell_status': '售卖状态',
		'start_time': '商品上架的时间',
		'supplier_id': '商家id(暂时只支持一个商家)',
	};

// 图片，一张图片
var img = {
		'server_id': '服务器id',
		'img_url': '图片路劲'
	};

// 具体商品（一个商品的一种型号）
var goods_info = {
		'default_goods': '是否默认型号',
		'goods_id': '商品id(meiren_goods_tbl)',
		'goods_info_id': '商品型号id(meiren_goods_info_tbl)',
		'inventory': '该型号的库存',
		'market_price': '市场价',
		'price': '美人商城价',
		'supplier_id': '商家id(暂时只支持一个商家)',
		'type_name': '型号名称',
		'sell_volume': '销量',

		// 下面是包的数据，都是默认值，因为这行是“源数据”
		'package_id': '对应包的id(meiren_package_tbl)',
		'package_price': '打包售卖的单价',
		'parent_id': '若被打包，本行商品数据是从另一行复制来的；parent_id=goods_info_id',
		'replace_id': '若本商品是替代另一商品的，则replace_id指向另一商品的goods_info_id'
	};




/**** 选中的商品 ****
 * copy from goodsData
 * 保存在 localStorage
 */
var selectedGoods = {
		goods_id: [goods, goods, ...], // 商品
		goods_id: [goods, goods, ...]
	};

// 商品id，meiren_goods_tbl
var goods_id = '整数'; // 默认商品的goods_id

// 商品，一个商品
var goods = {
		'add_time': '商品添加时间',
		'class_main_id': '商品分类，大类',
		'class_minor_id': '商品分类，小类',
		'comment_count': '评论数量',
		'deletion': '是否已删除',
		'goods_describe': '商品描述',
		'goods_id': '商品id(meiren_goods_tbl)',
		'goods_info': [goods_info, goods_info, ...], // 商品的所有型号（具体商品）
		'goods_name': '商品名称',
		'img_main': [img], // 图片
		'inventory': '该商品库存数量',
		'price': '默认型号的价格',
		'sell_status': '售卖状态',
		'start_time': '商品上架的时间',
		'supplier_id': '商家id(暂时只支持一个商家)',
	};

// 图片，一张图片
var img = {
		'server_id': '服务器id',
		'img_url': '图片路劲'
	};

// 具体商品（一个商品的一种型号）；这些数据是从“源数据”copy出来的
var goods_info = {
		'default_goods': '是否默认型号',
		'goods_id': '商品id(meiren_goods_tbl)',
		'goods_info_id': '商品型号id(meiren_goods_info_tbl)',
		'inventory': '该型号的库存',
		'market_price': '市场价',
		'price': '美人商城价',
		'supplier_id': '商家id(暂时只支持一个商家)',
		'type_name': '型号名称',
		'sell_volume': '销量',

		// 下面是包的数据，用户设置
		'package_id': '对应包的id(meiren_package_tbl)',
		'package_price': '打包售卖的单价',
		'parent_id': '若被打包，本行商品数据是从另一行复制来的；parent_id=goods_info_id',
		'replace_id': '若本商品是替代另一商品的，则replace_id指向另一商品的goods_info_id',
		'b_selected': '表示本型号被选中打包；只在客户端操作，不用保存到服务器'
	};



/************* 流程 ************/

/**
 * 设置包信息
 * 涉及的数据：packageData
 */
+ 设置packageData.package_name
+ 设置packageData.package_describe



/**
 * 选择打包商品
 * 涉及的数据：goodsData selectedGoods
 */
+ 从服务器获取goodsData，并过滤掉已选择的数据（同组 or 同是默认）
+ 选择商品，从goodsData中copy对应的数据，放到selectedGoods中
+ 要注意是选择默认商品，还是替代商品  “注意”


/**
 * 确认商品信息
 * 涉及的数据：selectedGoods
 */
+ 主要是设置goods_info中关于包的数据
+ 设置goods_info.package_num
+ 设置goods_info.package_price
+ 设置goods_info.b_selected=true;非选中的型号为:false or undefined
+ 关注`b_selected`；之后为packageData添加商品数据是从selectedGoods中获取的，其中要通过`b_selected`字段过滤


/**
 * 确认商品包
 * 涉及的数据：selectedGoods
 */
+ 只是将selectedGoods显示出来
+ 这里会用到`b_selected`字段过滤，得到被选中的goods_info


/**
 * 设置商品包的信息
 * 涉及的数据：packageData selectedGoods
 */
+ 设置packageData.position
+ 设置packageData.quantity
+ 设置packageData.img_main
+ 设置packageData.img_info
+ 从selectedGoods中过滤，得到选中的商品，并保存到packageData.goods_info
+ 为packageData.goods_info赋值是要注意区分默认商品和替代商品
+ 上传packageData后，删除本地的packageData selectedGoods