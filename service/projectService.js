const {validate} = require("validate.js")

const {addProjectDao, getAllProjectDao, updateProjectDao, deleteProjectDao} = require("../dao/projectDao");
const { handleDataPattern, formatResponse } = require("../utils/tool");
const { ValidationError } = require("../utils/errors");

module.exports.addProjectService = async function(projectInfo){
    projectInfo.description = JSON.stringify(projectInfo.description);

    // define validation rule
    const projectRule = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        url: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        github: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        description: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        order: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        thumb: {
            presence: {
                type: "string"
            }
        }
    }
    const validateResult = validate.validate(projectInfo, projectRule);
    if(!validateResult){
        const data = await addProjectDao(projectInfo);
        return formatResponse(0, "", [data]);
    }else{
        throw new ValidationError("数据验证失败");
    }
}

module.exports.getAllProjectService = async function(){
    const data = await getAllProjectDao();
    const obj = handleDataPattern(data);
    obj.forEach(item => {
        item.description = JSON.parse(item.description);
    });
    return formatResponse(0, "", obj);
}

module.exports.updateProjectService = async function(id, projectInfo){
    if(projectInfo.description){
        projectInfo.description = JSON.stringify(projectInfo.description);
    }
    const {dataValues} = await updateProjectDao(id, projectInfo);
    // 还原项目描述
    dataValues.description = JSON.parse(dataValues.description);
    return formatResponse(0, "", [dataValues]);
}


module.exports.deleteProjectService = async function(id){
    await deleteProjectDao(id);
    return formatResponse(0, "", true);
}