<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lecturer;

class ProfileAggregationController extends Controller
{
    /**
     * Get aggregated profile data (Data Pribadi)
     */
    public function dataPribadi(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $lecturer = Lecturer::with([
            'identities',
            'addresses',
            'families',
            'academic',
            'employments',
            'positions',
            'workContracts'
        ])->find($user->lecturer_id);

        if (!$lecturer) {
            return response()->json(['message' => 'Lecturer not found'], 404);
        }

        // Return first item or empty object if many (since they are usually one-to-one/has-many but we want the active one or just the latest)
        // Data pribadi mockup expects single object for each relation.
        
        $data = [
            'identities' => $this->mapIdentity($lecturer->identities->first()),
            'lecturer_addresses' => $this->mapAddress($lecturer->addresses->first()),
            'lecturer_families' => $this->mapFamily($lecturer->families->first()),
            'lecturer_academics' => $this->mapAcademic($lecturer->academic),
            'lecturer_employments' => $this->mapEmployment($lecturer->employments->first()),
            'positions' => $this->mapPosition($lecturer->positions->first()),
            'work_contracts' => $this->mapWorkContract($lecturer->workContracts->first()),
        ];

        return response()->json([
            'success' => true,
            'message' => 'Success',
            'data' => $data
        ]);
    }

    private function mapIdentity($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'nik' => $model->nik,
            'agama' => $model->religion,
            'kewarganegaraan' => $model->citizenship,
            'npwp' => $model->npwp,
        ];
    }

    private function mapAddress($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'email' => $model->email,
            'alamat' => $model->address,
            'rt' => $model->rt,
            'rw' => $model->rw,
            'kelurahan' => $model->village,
            'kecamatan' => $model->district,
            'provinsi' => $model->province,
            'kode_pos' => $model->postal_code,
            'nomor_telepon' => $model->phone,
        ];
    }

    private function mapFamily($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'status_pernikahan' => $model->marital_status,
            'nama_pasangan' => $model->spouse_name,
            'nip_pasangan' => $model->spouse_nip,
            'pekerjaan_pasangan' => $model->spouse_job,
        ];
    }

    private function mapAcademic($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'rumpun_ilmu' => $model->knowledge_cluster,
            'pohon_ilmu' => $model->knowledge_tree,
            'cabang_ilmu' => $model->knowledge_branch,
            'sinta_id' => $model->sinta_id,
        ];
    }

    private function mapEmployment($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'nip' => $model->nip,
            'nomor_sk_cpns' => $model->sk_cpns_number,
            'tanggal_sk_cpns' => $model->sk_cpns_date,
            'golongan_kepangkatan' => $model->rank_group,
            'tanggal_sk' => $model->sk_date,
            'tahun_kerja' => $model->work_years,
            'bulan_kerja' => $model->work_months,
            'status_kepegawaian' => $model->employment_status,
            'status_aktif' => $model->active_status,
        ];
    }

    private function mapPosition($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'nama_jabatan' => $model->position_name,
            'nomor_sk' => $model->sk_number,
            'tanggal_sk' => $model->sk_date,
            'tmt' => $model->tmt,
        ];
    }

    private function mapWorkContract($model) {
        if (!$model) return null;
        return [
            'id' => $model->id,
            'status_kerja' => $model->work_status,
            'status_saat_ini' => $model->current_status,
            'tmt' => $model->tmt,
        ];
    }
}
