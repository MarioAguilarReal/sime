<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\Comments;

class ApiCommentsController extends Controller
{
	public function register(Request $request, $id){
		$response = [
			'status' => 0,
			'message' => '',
			'data' => ''
		];

		$request->validate([
			//'commentType' => 'required',
			'comment' => 'required',
			'by' => 'required',
			'userRoleCreator' => 'required',
		]);

		$student = Student::find($id);
		if(!$student){
			$response['status'] = 201;
			$response['message'] = 'No student found';
			return response()->json($response, $response['status']);
		}

		$comments = new Comments ([
			'comment' => $request->comment,
			'by' => $request->by,
			'userRoleCreator' => $request->userRoleCreator,
		]);

		if ($request->has('commentType')){
			$comments->commentType = $request->commentType;
		}

		if ($comments){
			$student->comments()->save($comments);

			$response['status'] = 200;
			$response['message'] = 'Comment registered successfully';
			$response['data'] = $comments;
		}
		else {
			$response['status'] = 201;
			$response['message'] = 'Comment not registered';
		}
		return response()->json($response, $response['status']);
	}

	public function show($id_student){
		$response = [
			'status' => 0,
			'message' => '',
			'data' => ''
		];

		$student = Student::find($id_student);

		$comments = $student->comments()->first();
		if($comments){
			$response['status'] = 200;
			$response['message'] = 'Comments found';
			$response['data'] = $comments;
		}
		else {
			$response['status'] = 201;
			$response['message'] = 'No comments found';
		}
		return response()->json($response, $response['status']);
	}

	public function update(Request $request, $id){
		$response = [
			'status' => 0,
			'message' => '',
			'data' => ''
		];

		$request->validate([
			//'commentType' => 'required',
			'comment' => 'required',
			'by' => 'required',
			'userRoleCreator' => 'required',
		]);

		$comments = Comments::where('student_id', $id)->first();

		if($comments){
			$comments->update([
				'comment' => $request->comment,
				'by' => $request->by,
				'userRoleCreator' => $request->userRoleCreator,
			]);

			if ($request->has('commentType')){
				$comments->commentType = $request->commentType;
				$comments->save();
			}

			$response['status'] = 200;
			$response['message'] = 'Comment updated successfully';
			$response['data'] = $comments;
		}
		else {
			$response['status'] = 201;
			$response['message'] = 'Comment not updated';
		}
		return response()->json($response, $response['status']);
	}
}
