// 仮でlambdaを実行したい時用に保存
exports.handler = async function (event, context) {
    console.log(event);
	const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify('success'),
    };
    return response;
};