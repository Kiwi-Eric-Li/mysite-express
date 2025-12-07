const projectModel = require("./model/projectModel");

// 新增项目
module.exports.addProjectDao = async function(newProjectInfo){
    const {dataValues} = await projectModel.create(newProjectInfo);
    return dataValues;
}

// 获取所有项目
module.exports.getAllProjectDao = async function(){
    return await projectModel.findAll();
}


// 修改项目
module.exports.updateProjectDao = async function(id, projectInfo){
    await projectModel.update(projectInfo, {
        where: {
            id
        }
    });
    return await projectModel.findByPk(id);
}


// 删除项目
module.exports.deleteProjectDao = async function(id){
    return await projectModel.destroy({
        where: {
            id
        }
    })
}

